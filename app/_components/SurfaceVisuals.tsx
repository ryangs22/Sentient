// Static mock UIs shown next to each surface on the landing page.
// Pure markup (no hooks), so they work as Server Components.

function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="survey-frame">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-xl shadow-black/30">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        {children}
      </div>
    </div>
  );
}

// A collaborator's cursor with a name pill.
function Cursor({ label, className }: { label: string; className: string }) {
  return (
    <div className={`absolute flex items-start ${className}`}>
      <svg viewBox="0 0 12 18" className="h-4 w-3">
        <path
          d="M0 0 L0 14 L4 10.5 L7 17 L10 15.5 L7 9.5 L12 9.5 Z"
          className="fill-primary"
        />
      </svg>
      <span className="-ml-0.5 mt-3 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
        {label}
      </span>
    </div>
  );
}

/* ───────────── Canvas: a small flowchart ───────────── */

export function CanvasMock() {
  const box = "fill-white/5 stroke-white/25";
  const text = "fill-white";

  return (
    <Window>
      <div className="relative px-6 py-8">
        <svg viewBox="0 0 440 250" className="w-full" fill="none">
          <defs>
            <marker
              id="cm-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" className="fill-primary" />
            </marker>
          </defs>

          {/* connections */}
          <path
            d="M132 66 H210"
            strokeWidth="2"
            className="stroke-primary"
            markerEnd="url(#cm-arrow)"
          />
          <path
            d="M290 94 C290 150 270 172 246 176"
            strokeWidth="2"
            className="stroke-primary"
            markerEnd="url(#cm-arrow)"
          />

          {/* boxes */}
          <rect x="20" y="40" width="112" height="52" rx="9" strokeWidth="1.5" className={box} />
          <text x="76" y="71" textAnchor="middle" fontSize="13" fontWeight="500" className={text}>
            User signs up
          </text>

          <rect x="210" y="40" width="160" height="52" rx="9" strokeWidth="1.5" className={box} />
          <text x="290" y="62" textAnchor="middle" fontSize="13" fontWeight="500" className={text}>
            Send welcome
          </text>
          <text x="290" y="79" textAnchor="middle" fontSize="13" fontWeight="500" className={text}>
            email
          </text>

          <rect x="100" y="150" width="146" height="52" rx="9" strokeWidth="1.5" className={box} />
          <text x="173" y="172" textAnchor="middle" fontSize="13" fontWeight="500" className={text}>
            Onboarding
          </text>
          <text x="173" y="189" textAnchor="middle" fontSize="13" fontWeight="500" className={text}>
            checklist
          </text>
        </svg>

        <Cursor label="Agent" className="left-[58%] top-[74%]" />
      </div>
    </Window>
  );
}

/* ───────────── Docs: a spec with an agent summary ───────────── */

export function DocsMock() {
  return (
    <Window>
      <div className="space-y-3 px-7 py-7">
        <div className="h-4 w-2/5 rounded bg-white/70" />
        <div className="space-y-2 pt-1">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-11/12 rounded bg-white/10" />
          <div className="h-2 w-3/4 rounded bg-white/10" />
        </div>

        <div className="h-3 w-1/4 rounded bg-white/45 mt-6" />

        <div className="rounded-xl border border-primary/40 bg-primary/10 p-4">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            <span className="size-1.5 rotate-45 bg-primary" />
            Agent summary
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-primary/50" />
            <div className="h-2 w-4/5 rounded bg-primary/50" />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </Window>
  );
}

/* ───────────── Team board: kanban with live cursors ───────────── */

const COLUMNS = [
  { name: "Planning", cards: ["Onboarding flow", "Billing ERD"] },
  { name: "In progress", cards: ["API architecture", "Launch spec", "Org chart"] },
  { name: "Done", cards: ["Brand brief"] },
];

export function BoardMock() {
  return (
    <Window>
      <div className="relative grid grid-cols-3 gap-3 p-5">
        {COLUMNS.map((col) => (
          <div key={col.name} className="space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {col.name}
            </div>
            {col.cards.map((card) => (
              <div
                key={card}
                className="rounded-lg border border-white/10 bg-background/60 px-3 py-2.5"
              >
                <div className="text-xs font-medium">{card}</div>
                <div className="mt-2 h-1 w-3/5 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ))}

        <Cursor label="Maya" className="left-[30%] top-[52%]" />
        <Cursor label="Dev" className="left-[58%] top-[80%]" />
      </div>
    </Window>
  );
}