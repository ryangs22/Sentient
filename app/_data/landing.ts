import { LayoutGrid, FileText, KanbanSquare } from "lucide-react";
import { CanvasMock, DocsMock, BoardMock } from "../_components/SurfaceVisuals";

// Static copy for the landing page, kept out of the markup so it's easy to edit.

export const AUDIENCES = [
  "Product teams",
  "Founders",
  "Solo builders",
  "Agencies",
  "Consultants",
];

export const STEPS = [
  {
    title: "Describe what you're building",
    body: "Type or speak a prompt, like \"a database schema for a booking app, documented\". A new workspace opens with the agent already on it.",
  },
  {
    title: "Watch the agent work",
    body: "It draws shape by shape on the canvas and writes the spec in the doc, in real time. You see every step, not just the final result.",
  },
  {
    title: "Refine it together",
    body: "Edit anything by hand, ask for follow-ups, and invite your team. Everyone works on the same canvas and doc, live.",
  },
];

// One row per surface: icon, title, description, 3 bullets and a static mockup.
export const SURFACES = [
  {
    icon: LayoutGrid,
    visual: CanvasMock,
    title: "Canvas",
    description:
      "An infinite whiteboard where the agent draws flowcharts, ERDs, architecture diagrams and org charts shape by shape, and edits them in place when you ask.",
    bullets: [
      "Flowcharts, ERDs, architecture and org charts",
      "Drawn shape by shape, live, not behind a black box",
      "Ask for changes and it edits shapes in place",
    ],
  },
  {
    icon: FileText,
    visual: DocsMock,
    title: "Docs",
    description:
      "A block editor where the agent turns a diagram into a written spec, and rewrites or summarizes sections on command.",
    bullets: [
      "Turn any diagram into a written spec",
      "Rewrite or summarize a section on command",
      "Block-based editing you already know",
    ],
  },
  {
    icon: KanbanSquare,
    visual: BoardMock,
    title: "Team board",
    description:
      "A kanban board of every workspace in your org, with live cursors so teammates can jump in together.",
    bullets: [
      "Every workspace in your org, in one view",
      "Live cursors show who is working where",
      "Jump into a teammate's workspace together",
    ],
  },
];