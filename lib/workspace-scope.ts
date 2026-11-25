import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Prisma } from "@/lib/generated/prisma/client";

// Os workspaces da organização ativa, ou os pessoais do utilizador quando nenhuma organização está selecionada.
export function scopeWhere(
  orgId: string | null | undefined,
  userId: string,
): Prisma.WorkspaceWhereInput {
  return orgId
    ? { clerkOrgId: orgId }
    : { clerkOrgId: null, creatorId: userId };
}

// O que o dashboard e a lista de boards devem buscar, além do nome a exibir por cima.
export async function getWorkspaceScope(userId: string) {
  const { orgId } = await auth();
  const orgName = orgId
    ? (await 
        (await clerkClient()).organizations.getOrganization({ organizationId: orgId })
    ).name
    : "Personal";
  return { orgName, where: scopeWhere(orgId, userId) };
}