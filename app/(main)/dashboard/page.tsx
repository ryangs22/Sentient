import React from "react";
import { checkUser } from "@/actions/check-user";
import { redirect } from "next/navigation";
import { getWorkspaceScope } from "@/lib/workspace-scope";
import { prisma } from "@/lib/prisma";
import { withLastActivity, workspaceCardSelect } from "@/lib/workspace-status";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KanbanSquare, Plus } from "lucide-react";
import { RecentWorkspaces } from "./_components/RecentWorkspaces";

const RECENT_COUNT = 4;

const DashboardPage = async() => {
  const user = await checkUser();
  if (!user) redirect("/sign-in");
  
  const { orgName, where } = await getWorkspaceScope(user.id);
  const workspaces = await prisma.workspace.findMany({
    where,
    select: workspaceCardSelect,
  });

  const recent = workspaces
  .map(withLastActivity)
  .sort((a,b) => b.lastActivity.getTime() - a.lastActivity.getTime())
  .slice(0, RECENT_COUNT);

  return (
    <div className="p-8">
      {/* <DashboardPrompt/> */}


      <section className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">{orgName}</p>
            <h2 className="text-lg font-semibold">Workspaces Recentes</h2>
          </div>

          <div className="flex items-center gap-2">
              {workspaces.length > 0 && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                >
                  <Link href="/workspaces">
                    <KanbanSquare className="size-4" />
                    Visualizar quadro ({workspaces.length})
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" className="gap-1.5">
                <Plus className="size-4" />
                    Novo workspace
                </Button>
            </div>
          </div>

          {workspaces.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-muted-foreground">
            Ainda não há workspaces. Descreva acima o que você deseja planejar para iniciar um.
          </p>
        ) : (
          <RecentWorkspaces workspaces={recent} />
        )}
      </section>  
    </div>
  );
}

export default DashboardPage;