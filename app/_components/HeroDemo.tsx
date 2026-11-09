// Animated product walkthrough for the hero, built only with markup + CSS
// keyframes (no video file needed). It loops: the agent receives a prompt,
// draws four tables and their relationships on the canvas, then writes the
// spec in the doc. Decorative only, so it's hidden from screen readers.
//
// All visible text lives in the COPY object below, so it's easy to translate.

const COPY = {
  project: "booking-app",
  agent: "Agent",
  prompt: "Plan a booking app: database schema and spec",
  reply: "On it. Schema on the canvas first, then the spec in the doc.",
  drawing: "Drawing tables…",
  writing: "Writing the spec…",
  done: "Done · 4 tables, 1 doc",
  input: "Ask the agent…",
  docTitle: "Booking app · Spec",
  entities: "Entities",
  entityLines: [
    "users: people who book",
    "rooms: spaces and prices",
    "bookings: user + room + date",
    "payments: one per booking",
  ],
  relations: "Relationships",
  relationLines: ["A user has many bookings", "A booking belongs to one room"],
};

/* ───────────── Timeline (seconds) ───────────── */

const T = 17; // loop length

const pct = (s: number) => `${((s / T) * 100).toFixed(2)}%`;
const FADE = "opacity:0";
const RISE = "opacity:0;transform:translateY(0.6cqw)";

// Hidden until `a`, visible until `b`, then reset for the next loop.
function win(name: string, a: number, b = T - 1, from = RISE) {
  return `@keyframes ${name}{0%,${pct(a)}{${from}}${pct(a + 0.45)},${pct(b)}{opacity:1;transform:none}${pct(b + 0.4)},100%{${from}}}`;
}

// Reveals left to right (used for the doc's text lines).
function reveal(name: string, a: number, dur = 0.6) {
  const hidden = "clip-path:inset(0 100% 0 0)";
  return `@keyframes ${name}{0%,${pct(a)}{${hidden}}${pct(a + dur)},${pct(T - 1)}{clip-path:inset(0 0 0 0)}${pct(T - 0.4)},100%{${hidden}}}`;
}

// Draws an SVG path (needs pathLength="1" and stroke-dasharray: 1).
function draw(name: string, a: number, dur = 0.7) {
  return `@keyframes ${name}{0%,${pct(a)}{stroke-dashoffset:1}${pct(a + dur)},${pct(T - 1)}{stroke-dashoffset:0}${pct(T - 0.4)},100%{stroke-dashoffset:1}}`;
}

// The agent's cursor: [time, left %, top %] waypoints over the canvas.
const CURSOR: [number, number, number][] = [
  [2.0, 50, 92],
  [2.7, 22, 11], // users
  [4.3, 22, 11],
  [4.9, 72, 13], // bookings
  [6.3, 72, 13],
  [6.9, 72, 66], // rooms
  [8.1, 72, 66],
  [8.7, 22, 66], // payments
  [9.5, 22, 66],
  [10.2, 52, 50],
];

function move(name: string, pts: [number, number, number][]) {
  const [t0, x0, y0] = pts[0];
  const [tn, xn, yn] = pts[pts.length - 1];
  const frames = pts
    .slice(1)
    .map(([t, x, y]) => `${pct(t)}{left:${x}%;top:${y}%;opacity:1}`)
    .join("");
  return `@keyframes ${name}{0%{left:${x0}%;top:${y0}%;opacity:0}${pct(t0)}{left:${x0}%;top:${y0}%;opacity:1}${frames}${pct(tn + 0.5)}{left:${xn}%;top:${yn}%;opacity:0}100%{left:${xn}%;top:${yn}%;opacity:0}}`;
}

const CSS =
  [
    win("hd-user", 0.6),
    win("hd-agent", 1.3),
    win("hd-s1", 1.9, 10.3),
    win("hd-s2", 10.3, 14.8),
    win("hd-s3", 14.8),
    win("hd-t1", 2.8, T - 1, FADE),
    win("hd-t2", 5.0, T - 1, FADE),
    win("hd-t3", 6.8, T - 1, FADE),
    win("hd-t4", 8.6, T - 1, FADE),
    win("hd-a1", 5.6, T - 1, FADE),
    win("hd-a3", 7.5, T - 1, FADE),
    win("hd-a2", 9.5, T - 1, FADE),
    draw("hd-d1", 5.6),
    draw("hd-d3", 7.5),
    draw("hd-d2", 9.5),
    move("hd-cursor", CURSOR),
    win("hd-dt", 10.5),
    win("hd-dh1", 10.9),
    reveal("hd-l1", 11.3),
    reveal("hd-l2", 11.9),
    reveal("hd-l3", 12.5),
    reveal("hd-l4", 13.1),
    win("hd-dh2", 13.6),
    reveal("hd-l5", 14.0),
    reveal("hd-l6", 14.5),
  ].join("") +
  `@media (prefers-reduced-motion:reduce){.hd-anim{animation:none!important;opacity:1!important;clip-path:none!important;stroke-dashoffset:0!important;transform:none!important}.hd-motion{display:none!important}}`;

const an = (name: string, timing = "ease-out") => ({
  animation: `${name} ${T}s ${timing} infinite both`,
});

/* ───────────── Canvas pieces ───────────── */

type Row = { n: string; tag?: "PK" | "FK" };

function Table({
  x,
  y,
  w,
  name,
  rows,
  anim,
}: {
  x: number;
  y: number;
  w: number;
  name: string;
  rows: Row[];
  anim: string;
}) {
  const head = 26;
  const row = 22;
  const h = head + rows.length * row + 6;
  return (
    <g className="hd-anim" style={an(anim)}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className="fill-background stroke-white/20"
      />
      <path
        d={`M${x} ${y + head} V${y + 8} Q${x} ${y} ${x + 8} ${y} H${x + w - 8} Q${x + w} ${y} ${x + w} ${y + 8} V${y + head} Z`}
        className="fill-primary/25"
      />
      <text
        x={x + 12}
        y={y + 17}
        fontSize={12}
        fontFamily="monospace"
        className="fill-white/90"
      >
        {name}
      </text>
      {rows.map((r, i) => (
        <g key={r.n}>
          <text
            x={x + 12}
            y={y + head + row * i + 15}
            fontSize={11}
            fontFamily="monospace"
            className="fill-white/55"
          >
            {r.n}
          </text>
          {r.tag && (
            <text
              x={x + w - 12}
              y={y + head + row * i + 15}
              fontSize={9}
              fontFamily="monospace"
              textAnchor="end"
              className={r.tag === "PK" ? "fill-primary" : "fill-white/40"}
            >
              {r.tag}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

function Relation({ d, fade, dash }: { d: string; fade: string; dash: string }) {
  return (
    <g className="hd-anim" style={an(fade)}>
      <path
        d={d}
        pathLength={1}
        fill="none"
        strokeWidth={1.6}
        className="hd-anim stroke-primary"
        style={{ strokeDasharray: 1, ...an(dash, "linear") }}
        markerEnd="url(#hd-arrow)"
      />
    </g>
  );
}

/* ───────────── Component ───────────── */

export function HeroDemo() {
  const lineBase = "hd-anim flex items-center gap-[0.7cqw] whitespace-nowrap";

  return (
    <div
      aria-hidden
      className="absolute inset-0 select-none text-left [container-type:inline-size]"
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="flex size-full flex-col">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-[1.6cqw] py-[0.9cqw]">
          <div className="flex items-center gap-[0.6cqw]">
            <span className="size-[0.8cqw] rounded-full bg-white/15" />
            <span className="size-[0.8cqw] rounded-full bg-white/15" />
            <span className="size-[0.8cqw] rounded-full bg-white/15" />
            <span className="ml-[1cqw] font-mono text-[1.05cqw] text-muted-foreground">
              {COPY.project}
            </span>
          </div>
          <div className="flex items-center gap-[0.5cqw]">
            <span className="flex size-[2cqw] items-center justify-center rounded-full bg-white/10 text-[0.9cqw]">
              A
            </span>
            <span className="flex size-[2cqw] items-center justify-center rounded-full bg-white/10 text-[0.9cqw]">
              M
            </span>
            <span className="flex items-center gap-[0.5cqw] rounded-full bg-primary/20 px-[1cqw] py-[0.35cqw] font-mono text-[0.9cqw] text-primary">
              <span className="size-[0.6cqw] animate-pulse rounded-full bg-primary" />
              {COPY.agent}
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Canvas */}
          <div className="relative w-[46%] border-r border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:2cqw_2cqw]">
            <svg viewBox="0 0 460 500" className="absolute inset-0 size-full">
              <defs>
                <marker
                  id="hd-arrow"
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

              <Relation d="M170 77 H220 V99 H270" fade="hd-a1" dash="hd-d1" />
              <Relation d="M355 160 V300" fade="hd-a3" dash="hd-d3" />
              <Relation d="M170 359 H245 V143 H270" fade="hd-a2" dash="hd-d2" />

              <Table
                x={20}
                y={40}
                w={150}
                name="users"
                anim="hd-t1"
                rows={[{ n: "id", tag: "PK" }, { n: "name" }, { n: "email" }]}
              />
              <Table
                x={270}
                y={40}
                w={170}
                name="bookings"
                anim="hd-t2"
                rows={[
                  { n: "id", tag: "PK" },
                  { n: "user_id", tag: "FK" },
                  { n: "room_id", tag: "FK" },
                  { n: "date" },
                ]}
              />
              <Table
                x={270}
                y={300}
                w={170}
                name="rooms"
                anim="hd-t3"
                rows={[{ n: "id", tag: "PK" }, { n: "name" }, { n: "price" }]}
              />
              <Table
                x={20}
                y={300}
                w={150}
                name="payments"
                anim="hd-t4"
                rows={[
                  { n: "id", tag: "PK" },
                  { n: "booking_id", tag: "FK" },
                  { n: "amount" },
                ]}
              />
            </svg>

            {/* Agent cursor */}
            <div
              className="hd-motion absolute z-10"
              style={an("hd-cursor", "ease-in-out")}
            >
              <svg viewBox="0 0 12 18" className="h-[1.9cqw] w-[1.3cqw]">
                <path
                  d="M0 0 L0 14 L4 10.5 L7 17 L10 15.5 L7 9.5 L12 9.5 Z"
                  className="fill-primary"
                />
              </svg>
              <span className="absolute left-[1.2cqw] top-[1.3cqw] rounded-full bg-primary px-[0.8cqw] py-[0.2cqw] font-mono text-[0.85cqw] text-primary-foreground">
                {COPY.agent}
              </span>
            </div>
          </div>

          {/* Doc */}
          <div className="w-[28%] space-y-[0.9cqw] border-r border-white/10 p-[1.8cqw]">
            <div
              className="hd-anim text-[1.5cqw] font-medium"
              style={an("hd-dt")}
            >
              {COPY.docTitle}
            </div>

            <div
              className="hd-anim pt-[0.6cqw] font-mono text-[0.85cqw] uppercase tracking-widest text-primary/80"
              style={an("hd-dh1")}
            >
              {COPY.entities}
            </div>
            {COPY.entityLines.map((line, i) => (
              <div
                key={line}
                className={`${lineBase} text-[1.05cqw] text-white/65`}
                style={an(`hd-l${i + 1}`, "linear")}
              >
                <span className="size-[0.45cqw] shrink-0 rounded-full bg-primary" />
                {line}
              </div>
            ))}

            <div
              className="hd-anim pt-[0.6cqw] font-mono text-[0.85cqw] uppercase tracking-widest text-primary/80"
              style={an("hd-dh2")}
            >
              {COPY.relations}
            </div>
            {COPY.relationLines.map((line, i) => (
              <div
                key={line}
                className={`${lineBase} text-[1.05cqw] text-white/65`}
                style={an(`hd-l${i + 5}`, "linear")}
              >
                <span className="size-[0.45cqw] shrink-0 rounded-full bg-primary" />
                {line}
              </div>
            ))}
          </div>

          {/* Agent chat */}
          <div className="flex w-[26%] flex-col gap-[1cqw] p-[1.4cqw]">
            <div className="font-mono text-[0.85cqw] uppercase tracking-widest text-muted-foreground">
              {COPY.agent}
            </div>

            <div
              className="hd-anim ml-auto max-w-[90%] rounded-[1cqw] rounded-br-[0.3cqw] bg-primary px-[1.1cqw] py-[0.8cqw] text-[1.05cqw] leading-snug text-primary-foreground"
              style={an("hd-user")}
            >
              {COPY.prompt}
            </div>

            <div
              className="hd-anim max-w-[92%] rounded-[1cqw] rounded-bl-[0.3cqw] bg-white/8 px-[1.1cqw] py-[0.8cqw] text-[1.05cqw] leading-snug text-white/75"
              style={an("hd-agent")}
            >
              {COPY.reply}
            </div>

            {/* Status chips: one visible at a time */}
            <div className="relative h-[3cqw]">
              <span
                className="hd-anim hd-motion absolute left-0 top-0 flex items-center gap-[0.6cqw] rounded-full border border-primary/40 px-[1cqw] py-[0.4cqw] font-mono text-[0.9cqw] text-primary"
                style={an("hd-s1")}
              >
                <span className="size-[0.6cqw] animate-pulse rounded-full bg-primary" />
                {COPY.drawing}
              </span>
              <span
                className="hd-anim hd-motion absolute left-0 top-0 flex items-center gap-[0.6cqw] rounded-full border border-primary/40 px-[1cqw] py-[0.4cqw] font-mono text-[0.9cqw] text-primary"
                style={an("hd-s2")}
              >
                <span className="size-[0.6cqw] animate-pulse rounded-full bg-primary" />
                {COPY.writing}
              </span>
              <span
                className="hd-anim absolute left-0 top-0 rounded-full bg-primary/15 px-[1cqw] py-[0.4cqw] font-mono text-[0.9cqw] text-primary"
                style={an("hd-s3")}
              >
                {COPY.done}
              </span>
            </div>

            <div className="mt-auto rounded-[0.8cqw] border border-white/10 px-[1.1cqw] py-[0.9cqw] text-[1cqw] text-white/35">
              {COPY.input}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}