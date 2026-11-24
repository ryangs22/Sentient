import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { FREE_MONTHLY_PROMPTS } from "@/lib/plan-limits";

// Os limites pagos de prompts vêm das features dos planos do Clerk (verificados em ordem), por membro nos planos de equipe.
const PROMPT_FEATURES = [
  { feature: "agent_prompts_2000", perMember: 2000 },
  { feature: "agent_prompts_500", perMember: 500 },
];

// Tudo tem como escopo um "owner" (proprietário): um ID de organização do Clerk para workspaces de org, ou um ID de usuário do Clerk para
// workspaces pessoais. O Clerk coloca prefixos nos IDs, então eles não entram em conflito.
export const workspaceOwnerSelect = { clerkOrgId: true, creator: { select: { clerkId: true } } } as const;

export function workspaceOwnerId(workspace: { clerkOrgId: string | null; creator: { clerkId: string } }) {
  return workspace.clerkOrgId ?? workspace.creator.clerkId;
}

export async function getWorkspaceOwnerId(workspaceId: string) {
  const workspace = await prisma.workspace.findUniqueOrThrow({ where: { id: workspaceId }, select: workspaceOwnerSelect });
  return workspaceOwnerId(workspace);
}

// As features do plano do proprietário, consultadas no Clerk pelo servidor. Isso funciona para qualquer proprietário, não
// apenas para a org selecionada no seletor do usuário, e até mesmo para visitantes deslogados (links compartilhados).
export async function getEntitlements(ownerId: string) {
  const clerk = await clerkClient();
  const isOrg = ownerId.startsWith("org_");
  const features = new Set<string>();

  try {
    const subscription = isOrg
      ? await clerk.billing.getOrganizationBillingSubscription(ownerId)
      : await clerk.billing.getUserBillingSubscription(ownerId);
    for (const item of subscription.subscriptionItems) {
      // "past_due" mantém o acesso enquanto o Clerk tenta cobrar novamente.
      if (item.status === "active" || item.status === "past_due") {
        item.plan?.features.forEach((feature) => features.add(feature.slug));
      }
    }
  } catch {
    // Sem assinatura (ou Clerk inacessível): trata como plano gratuito.
  }

  const paid = PROMPT_FEATURES.find(({ feature }) => features.has(feature));
  let promptLimit = FREE_MONTHLY_PROMPTS;
  if (paid) {
    const members = isOrg
      ? ((await clerk.organizations.getOrganization({ organizationId: ownerId, includeMembersCount: true }))
          .membersCount ?? 1)
      : 1;
    promptLimit = paid.perMember * members;
  }

  return {
    isPaid: !!paid,
    promptLimit,
    unlimitedWorkspaces: features.has("unlimited_workspaces"),
    publicSharing: features.has("public_sharing"),
    pdfExport: features.has("pdf_export"),
  };
}