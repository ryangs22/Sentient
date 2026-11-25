import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { workspaceOwnerSelect } from "./billing";

// Os workspaces de organização estão abertos a todos os membros dessa organização; os pessoais (sem organização) apenas ao seu criador.
export async function canAccessWorkspace(workspaceId: string) {
  const { userId, orgId } = await auth();
  if (!userId) return false;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: workspaceOwnerSelect,
  });
  if (!workspace) return false;

  if (!workspace.clerkOrgId) return workspace.creator.clerkId === userId;
  if (workspace.clerkOrgId === orgId) return true;

  // A sessão conhece apenas a organização ativa, por isso verifica a associação completa para links de outra organização.
  const clerk = await clerkClient();
  const { data: memberships } = await clerk.users.getOrganizationMembershipList({ userId, limit: 100 });
  return memberships.some((m) => m.organization.id === workspace.clerkOrgId);
}