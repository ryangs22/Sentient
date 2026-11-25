import { max } from "date-fns";
import type { WorkspaceStatus } from "@/lib/generated/prisma/enums";

// Colunas do board, em ordem. Compartilhadas entre o quadro kanban e os cards de workspaces recentes.
export const WORKSPACE_STATUSES: { status: WorkspaceStatus; title: string }[] = [
  { status: "PLANNING", title: "Planejamento" },
  { status: "IN_PROGRESS", title: "Em andamento" },
  { status: "IN_REVIEW", title: "Em revisão" },
  { status: "DONE", title: "Concluído" },
];

export function statusTitle(status: WorkspaceStatus) {
  return WORKSPACE_STATUSES.find((s) => s.status === status)?.title ?? status;
}

// Campos que todo card de workspace precisa, incluindo o que `withLastActivity` lê.
export const workspaceCardSelect = {
  id: true,
  name: true,
  description: true,
  status: true,
  updatedAt: true,
  creator: { select: { name: true, imageUrl: true } },
  doc: { select: { updatedAt: true } },
  canvas: { select: { updatedAt: true } },
} as const;

type Dated = { updatedAt: Date } | null;

// O `updatedAt` próprio do workspace só muda ao renomear ou mover, então a atividade real também conta
// edições no documento (`doc`) e no canvas.
export function withLastActivity<
  T extends { updatedAt: Date; doc: Dated; canvas: Dated }
  >(workspace: T) {
    const lastActivity = max([
        workspace.updatedAt, 
        workspace.doc?.updatedAt ?? 0, 
        workspace.canvas?.updatedAt ?? 0]);
  return { ...workspace, lastActivity };
}