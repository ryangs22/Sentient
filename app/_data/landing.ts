import { LayoutGrid, FileText, KanbanSquare } from "lucide-react";
import { CanvasMock, DocsMock, BoardMock } from "../_components/SurfaceVisuals";

// Textos estáticos da landing page, mantidos fora da marcação para facilitar a edição.

export const AUDIENCES = [
  "Times de produto",
  "Fundadores",
  "Criadores solo",
  "Agências",
  "Consultores",
];

export const STEPS = [
  {
    title: "Descreva o que você está construindo",
    body: "Digite ou fale um prompt, como \"um schema de banco de dados para um app de reservas, documentado\". Um novo workspace abre com o agente já trabalhando nele.",
  },
  {
    title: "Acompanhe o agente trabalhando",
    body: "Ele desenha forma por forma no canvas e escreve a especificação no doc, em tempo real. Você vê cada etapa, não só o resultado final.",
  },
  {
    title: "Refinem juntos",
    body: "Edite qualquer coisa à mão, peça ajustes e convide sua equipe. Todos trabalham no mesmo canvas e doc, ao vivo.",
  },
];

// Uma linha por superfície: ícone, título, descrição, 3 bullets e um mockup estático.
export const SURFACES = [
  {
    icon: LayoutGrid,
    visual: CanvasMock,
    title: "Canvas",
    description:
      "Um quadro branco infinito onde o agente desenha fluxogramas, ERDs, diagramas de arquitetura e organogramas forma por forma, e os edita no lugar quando você pede.",
    bullets: [
      "Fluxogramas, ERDs, arquitetura e organogramas",
      "Desenhado forma por forma, ao vivo, sem caixa-preta",
      "Peça mudanças e ele edita as formas no lugar",
    ],
  },
  {
    icon: FileText,
    visual: DocsMock,
    title: "Docs",
    description:
      "Um editor de blocos onde o agente transforma um diagrama em especificação escrita, e reescreve ou resume seções sob comando.",
    bullets: [
      "Transforme qualquer diagrama em uma especificação escrita",
      "Reescreva ou resuma uma seção sob comando",
      "Edição em blocos que você já conhece",
    ],
  },
  {
    icon: KanbanSquare,
    visual: BoardMock,
    title: "Quadro da equipe",
    description:
      "Um quadro kanban com todos os workspaces da sua organização, com cursores ao vivo para que colegas entrem juntos.",
    bullets: [
      "Todos os workspaces da sua organização, em uma só visão",
      "Cursores ao vivo mostram quem está trabalhando onde",
      "Entre no workspace de um colega e trabalhem juntos",
    ],
  },
];