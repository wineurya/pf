/**
 * Process wireframe drafts.
 *
 * Two drafts toggleable for comparison. Both use rebuild card shape:
 * top-rounded only, no border, media at top with bottom gradient fade into
 * page surface, title below — same anatomy as `ProcessSection.jsx`.
 *
 * Draft A — abstract wireframe primitives (stickies, flow nodes, phone, redlines).
 * Draft B — reference-led UI snippets (transcript, pill columns, canvas cards,
 *           timestamped notes). Same shape, same titles, no color in either.
 */

import { useState } from "react";

/* Titles reworded to match the rebuild page voice — "no surprises", visible
 * work, measured pace. Shorter, more declarative than the section bodies. */
const CARDS = [
  {
    key: "listen",
    title: "Listen before screens",
    body: "Interviews and tagged transcripts set the brief before any wireframe lands.",
  },
  {
    key: "structure",
    title: "Surface the structure",
    body: "Phases, decisions, and trade-offs get labelled, so the team critiques structure not taste.",
  },
  {
    key: "test",
    title: "Test the risky moments",
    body: "Clickable prototypes pressure-test the friction long before visual polish.",
  },
  {
    key: "handoff",
    title: "Refine through handoff",
    body: "Usability rounds, accessibility checks, and specs travel with the work into build.",
  },
];

/* Grayscale tokens — no chroma anywhere. */
const PAGE = "#f7f7f5";       // outer page surface (≈ rebuild page-bg)
const PANEL = "#ffffff";      // inner UI window
const HAIR = "#e7e7e5";       // hairlines
const HAIR_2 = "#efefed";     // lighter hairlines
const INK = "#1f1f1f";        // primary text/strokes
const SUB = "#6b6b67";        // subdued text
const MUTED = "#a3a39e";      // muted text
const SOFT = "#dcdcd8";       // soft fills
const SOFT_2 = "#ededea";     // softer fills
const BAND = "#f0f0ed";       // highlight band (replaces yellow)

export default function ProcessBentoDraftPage() {
  const [draft, setDraft] = useState("B");

  return (
    <div className="min-h-dvh w-full px-6 py-12 font-[family-name:var(--font-body)]" style={{ background: PAGE, color: INK }}>
      <header className="mx-auto mb-10 flex max-w-6xl items-end justify-between gap-6">
        <div>
          <span className="inline-block rounded-md border border-black/10 bg-black/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-black/60">
            Draft {draft}
          </span>
          <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.5px]">
            Process — bento wireframes
          </h1>
          <p className="mt-1 text-[14px]" style={{ color: SUB }}>
            Two drafts, monochrome. Rebuild card shape — top-rounded, fades into surface.
          </p>
        </div>
        <DraftToggle value={draft} onChange={setDraft} />
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-[38px]">
        {CARDS.map((c, i) => (
          <Card
            key={c.key}
            step={String(i + 1).padStart(2, "0")}
            title={c.title}
            body={c.body}
          >
            {draft === "A" ? <DraftA which={c.key} /> : <DraftB which={c.key} />}
          </Card>
        ))}
      </div>
    </div>
  );
}

function DraftToggle({ value, onChange }) {
  return (
    <div
      className="inline-flex items-center rounded-[10px] p-1"
      style={{ background: PANEL, border: `1px solid ${HAIR}` }}
    >
      {["A", "B"].map((v) => {
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className="rounded-[7px] px-3 py-1.5 text-[12px] font-semibold transition-colors"
            style={{
              background: active ? INK : "transparent",
              color: active ? "#ffffff" : SUB,
            }}
          >
            Draft {v}
          </button>
        );
      })}
    </div>
  );
}

/* -------- Rebuild card shell: top-rounded, fade into surface --------- */

function Card({ step, title, body, children }) {
  return (
    <figure
      className="flex flex-col items-stretch overflow-hidden rounded-t-2xl"
      style={{ background: PAGE }}
    >
      {/* Media — visual snippet with bottom fade into page surface */}
      <div className="relative w-full shrink-0 overflow-hidden" style={{ aspectRatio: "16 / 11" }}>
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%]"
          style={{
            background: `linear-gradient(to bottom, color-mix(in srgb, ${PAGE} 0%, transparent) 0%, color-mix(in srgb, ${PAGE} 35%, transparent) 38%, color-mix(in srgb, ${PAGE} 78%, transparent) 70%, ${PAGE} 100%)`,
          }}
        />
      </div>

      {/* Title + subtitle — mirrors rebuild ProcessCard footer.
       *  Step number prefix mirrors Origin's "HOW TO FILE" bento pattern. */}
      <figcaption className="flex flex-col gap-2.5 px-6 pb-6 pt-[4px]">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <span
            className="inline-flex shrink-0 items-center justify-center self-center"
            style={{ width: 26, height: 26, borderRadius: 8, background: SOFT_2, border: `1px solid ${HAIR}` }}
            aria-hidden
          >
            <span style={{ width: 10, height: 2, background: INK, borderRadius: 1 }} />
          </span>
          <span
            className="font-semibold leading-6"
            style={{ color: MUTED, fontSize: 14, letterSpacing: "0.2px", fontFamily: "ui-monospace, monospace" }}
          >
            {step}.
          </span>
          <p
            className="m-0 text-[16px] font-semibold leading-6"
            style={{ color: INK, letterSpacing: "-0.5px" }}
          >
            {title}
          </p>
        </div>
        <p
          className="m-0 text-[14px] font-medium leading-5"
          style={{ color: SUB, letterSpacing: "-0.3px" }}
        >
          {body}
        </p>
      </figcaption>
    </figure>
  );
}

/* ========================================================================
 *  DRAFT A  —  Abstract wireframe primitives (monochrome)
 * ====================================================================== */

function DraftA({ which }) {
  switch (which) {
    case "listen": return <ResearchA />;
    case "structure": return <StructureA />;
    case "test": return <PrototypeA />;
    case "handoff": return <HandoffA />;
    default: return null;
  }
}

function ResearchA() {
  return (
    <svg viewBox="0 0 480 330" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <path d="M 90 80 C 170 50, 250 200, 360 130" fill="none" stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 4" />
      <g transform="translate(74 36)">
        <rect width="118" height="118" rx="4" fill={SOFT_2} stroke={INK} strokeWidth="1.4" />
        <line x1="14" y1="28" x2="84" y2="28" stroke={INK} strokeWidth="2.5" />
        <line x1="14" y1="50" x2="100" y2="50" stroke={MUTED} strokeWidth="1.2" />
        <line x1="14" y1="68" x2="86" y2="68" stroke={MUTED} strokeWidth="1.2" />
        <line x1="14" y1="86" x2="66" y2="86" stroke={MUTED} strokeWidth="1.2" />
        <circle cx="58" cy="10" r="4" fill={INK} />
      </g>
      <g transform="translate(196 92)">
        <rect width="140" height="128" rx="4" fill={PANEL} stroke={INK} strokeWidth="1.6" />
        <line x1="14" y1="28" x2="108" y2="28" stroke={INK} strokeWidth="2.8" />
        <line x1="14" y1="50" x2="118" y2="50" stroke={INK} strokeWidth="1.2" />
        <line x1="14" y1="68" x2="98" y2="68" stroke={INK} strokeWidth="1.2" />
        <line x1="14" y1="86" x2="112" y2="86" stroke={INK} strokeWidth="1.2" />
        <line x1="14" y1="104" x2="76" y2="104" stroke={INK} strokeWidth="1.2" />
        <circle cx="70" cy="10" r="4" fill={INK} />
      </g>
      <g transform="translate(340 44)">
        <rect width="106" height="106" rx="4" fill={SOFT} stroke={INK} strokeWidth="1.4" />
        <line x1="12" y1="26" x2="76" y2="26" stroke={INK} strokeWidth="2.5" />
        <line x1="12" y1="46" x2="88" y2="46" stroke={MUTED} strokeWidth="1.2" />
        <line x1="12" y1="62" x2="72" y2="62" stroke={MUTED} strokeWidth="1.2" />
        <circle cx="52" cy="9" r="4" fill={MUTED} />
      </g>
    </svg>
  );
}

function StructureA() {
  return (
    <svg viewBox="0 0 480 330" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <marker id="arA" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={INK} />
        </marker>
        <marker id="arA-soft" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={MUTED} />
        </marker>
      </defs>
      <rect x="60" y="56" width="108" height="58" rx="8" fill={PANEL} stroke={INK} strokeWidth="1.6" />
      <line x1="78" y1="80" x2="138" y2="80" stroke={INK} strokeWidth="2" />
      <line x1="78" y1="94" x2="120" y2="94" stroke={MUTED} strokeWidth="1.2" />

      <polygon points="252,86 304,52 356,86 304,120" fill={PANEL} stroke={INK} strokeWidth="1.8" />
      <polygon
        points="252,86 304,52 356,86 304,120"
        fill="none"
        stroke={INK}
        strokeWidth="1.4"
        strokeDasharray="3 3"
        transform="scale(1.06) translate(-18 -6)"
      />
      <line x1="282" y1="86" x2="326" y2="86" stroke={INK} strokeWidth="2" />

      <rect x="216" y="186" width="106" height="56" rx="8" fill={PANEL} stroke={INK} strokeWidth="1.4" />
      <line x1="234" y1="208" x2="294" y2="208" stroke={INK} strokeWidth="2" />
      <line x1="234" y1="222" x2="272" y2="222" stroke={MUTED} strokeWidth="1.2" />

      <rect x="340" y="186" width="100" height="56" rx="8" fill={SOFT_2} stroke={MUTED} strokeWidth="1.4" strokeDasharray="3 3" />
      <line x1="358" y1="208" x2="406" y2="208" stroke={MUTED} strokeWidth="2" />
      <line x1="358" y1="222" x2="388" y2="222" stroke={MUTED} strokeWidth="1.2" />

      <line x1="168" y1="85" x2="246" y2="85" stroke={INK} strokeWidth="1.6" markerEnd="url(#arA)" />
      <line x1="304" y1="120" x2="270" y2="180" stroke={INK} strokeWidth="1.6" markerEnd="url(#arA)" />
      <line x1="356" y1="86" x2="382" y2="180" stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 4" markerEnd="url(#arA-soft)" />

      <text x="262" y="150" fontSize="10" fill={INK} fontFamily="ui-monospace, monospace">yes</text>
      <text x="368" y="148" fontSize="10" fill={MUTED} fontFamily="ui-monospace, monospace">no</text>
    </svg>
  );
}

function PrototypeA() {
  return (
    <svg viewBox="0 0 480 330" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <path d="M 40 260 C 130 260, 150 60, 460 30" fill="none" stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 4" />
      <circle cx="40" cy="260" r="3" fill={MUTED} />
      <g transform="translate(174 26)">
        <rect width="160" height="270" rx="22" fill={PANEL} stroke={INK} strokeWidth="1.8" />
        <rect x="56" y="10" width="48" height="9" rx="4.5" fill={INK} />
        <rect x="12" y="28" width="136" height="232" rx="12" fill={SOFT_2} stroke={HAIR} strokeWidth="1" />
        <rect x="22" y="40" width="56" height="7" rx="3" fill={INK} />
        <rect x="122" y="40" width="20" height="7" rx="3" fill={MUTED} />
        <rect x="22" y="60" width="116" height="72" rx="6" fill={PANEL} stroke={HAIR} strokeWidth="1" />
        <rect x="30" y="70" width="58" height="6" rx="3" fill={INK} />
        <rect x="30" y="82" width="98" height="4" rx="2" fill={MUTED} />
        <rect x="30" y="92" width="84" height="4" rx="2" fill={MUTED} />
        <rect x="30" y="102" width="70" height="4" rx="2" fill={MUTED} />
        <rect x="22" y="144" width="116" height="12" rx="3" fill={PANEL} stroke={HAIR} strokeWidth="1" />
        <rect x="22" y="162" width="116" height="12" rx="3" fill={PANEL} stroke={HAIR} strokeWidth="1" />
        <rect x="22" y="180" width="116" height="12" rx="3" fill={PANEL} stroke={HAIR} strokeWidth="1" />
        <rect x="22" y="208" width="116" height="28" rx="8" fill={INK} />
        <rect x="56" y="219" width="48" height="6" rx="3" fill="#ffffff" />
      </g>

      <g transform="translate(294 244)">
        <circle r="18" fill="none" stroke={INK} strokeWidth="1.4" />
        <circle r="11" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.6" />
        <circle r="4" fill={INK} />
      </g>
      <g transform="translate(304 251)">
        <path d="M 0 0 L 14 4 L 6 7 L 4 15 Z" fill={PANEL} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function HandoffA() {
  return (
    <svg viewBox="0 0 480 330" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <g transform="translate(86 36)">
        <rect width="220" height="246" rx="10" fill={SOFT_2} stroke={MUTED} strokeWidth="1.2" />
        <rect x="16" y="22" width="120" height="8" rx="4" fill={MUTED} />
        <rect x="16" y="38" width="180" height="4" rx="2" fill={HAIR} />
        <rect x="16" y="48" width="150" height="4" rx="2" fill={HAIR} />
        <rect x="16" y="58" width="170" height="4" rx="2" fill={HAIR} />
      </g>
      <g transform="translate(140 56)">
        <rect width="240" height="252" rx="10" fill={PANEL} stroke={INK} strokeWidth="1.6" />
        <rect x="34" y="44" width="172" height="108" rx="6" fill={SOFT_2} stroke={INK} strokeWidth="1.4" strokeDasharray="4 3" />
        <g stroke={INK} strokeWidth="1.2">
          <line x1="34" y1="32" x2="206" y2="32" />
          <line x1="34" y1="28" x2="34" y2="36" />
          <line x1="206" y1="28" x2="206" y2="36" />
        </g>
        <text x="110" y="26" fontSize="9" fill={INK} fontFamily="ui-monospace, monospace">172</text>
        <g stroke={INK} strokeWidth="1.2">
          <line x1="218" y1="44" x2="218" y2="152" />
          <line x1="214" y1="44" x2="222" y2="44" />
          <line x1="214" y1="152" x2="222" y2="152" />
        </g>
        <text x="224" y="100" fontSize="9" fill={INK} fontFamily="ui-monospace, monospace">108</text>
        <g transform="translate(34 168)">
          <rect width="78" height="22" rx="11" fill={PANEL} stroke={INK} strokeWidth="1.4" />
          <circle cx="13" cy="11" r="4" fill={INK} />
          <text x="24" y="14" fontSize="9" fill={INK} fontFamily="ui-monospace, monospace" fontWeight="600">A11y · AA</text>
        </g>
        <g transform="translate(34 200)">
          <g>
            <rect width="10" height="10" rx="2" fill={INK} />
            <path d="M 2.5 5 L 4.5 7 L 8 3" stroke={PANEL} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <rect x="16" y="2" width="142" height="6" rx="3" fill={INK} />
          </g>
          <g transform="translate(0 18)">
            <rect width="10" height="10" rx="2" fill={PANEL} stroke={MUTED} strokeWidth="1.2" />
            <rect x="16" y="2" width="118" height="6" rx="3" fill={MUTED} />
          </g>
          <g transform="translate(0 36)">
            <rect width="10" height="10" rx="2" fill={PANEL} stroke={MUTED} strokeWidth="1.2" />
            <rect x="16" y="2" width="96" height="6" rx="3" fill={MUTED} />
          </g>
        </g>
      </g>
    </svg>
  );
}

/* ========================================================================
 *  DRAFT B  —  Reference-led UI snippets (monochrome)
 * ====================================================================== */

function DraftB({ which }) {
  switch (which) {
    case "listen": return <ResearchB />;
    case "structure": return <StructureB />;
    case "test": return <PrototypeB />;
    case "handoff": return <HandoffB />;
    default: return null;
  }
}

/* Reusable atoms ---------------------------------------------------------- */

function Window({ children, style }) {
  return (
    <div
      className="absolute overflow-hidden rounded-[10px]"
      style={{ background: PANEL, border: `1px solid ${HAIR}`, boxShadow: "0 1px 0 rgba(0,0,0,0.02)", ...style }}
    >
      {children}
    </div>
  );
}

function Dot({ size = 16, fill = SOFT }) {
  return <span aria-hidden style={{ display: "inline-block", width: size, height: size, borderRadius: 999, background: fill }} />;
}

function Bar({ w, h = 6, color = HAIR, radius = 3 }) {
  return <span aria-hidden style={{ display: "inline-block", width: w, height: h, background: color, borderRadius: radius }} />;
}

/* 1 · Listen before screens — transcript with highlight + tag popover ----- */
function ResearchB() {
  return (
    <div className="absolute inset-0">
      <Window style={{ top: 22, left: 28, right: 64, bottom: 64 }}>
        <div className="flex flex-col gap-2.5 px-4 py-3.5">
          <Row name="A" time="1:05" />
          <Row name="B" time="2:12" highlight />
          <Row name="C" time="3:48" muted />
        </div>
      </Window>

      <Window style={{ right: 28, bottom: 38, width: 140 }}>
        <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="flex items-center gap-1.5">
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: INK, transform: "rotate(45deg)" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: INK }}>Tag</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 px-3 py-2">
          <span style={{ fontSize: 9, color: MUTED }}>Label</span>
          <div className="flex items-center justify-between rounded-[4px] px-2 py-1" style={{ background: SOFT_2, border: `1px solid ${HAIR}` }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: INK }}>Insight</span>
            <span style={{ display: "inline-block", width: 0, height: 0, borderLeft: "3.5px solid transparent", borderRight: "3.5px solid transparent", borderTop: `4px solid ${INK}` }} />
          </div>
        </div>
      </Window>
    </div>
  );
}

function Row({ name, time, highlight, muted }) {
  const body = (
    <div className="flex flex-1 flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Bar w={56} h={7} color={INK} />
        <span style={{ fontSize: 9, color: MUTED, fontFamily: "ui-monospace, monospace" }}>{time}</span>
        <span style={{ display: "inline-block", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `5px solid ${MUTED}` }} />
      </div>
      {highlight ? (
        <div className="rounded-[4px] px-1.5 py-1" style={{ background: BAND }}>
          <div className="flex flex-col gap-1">
            <Bar w={"96%"} h={5} color={INK} />
            <Bar w={"88%"} h={5} color={INK} />
            <Bar w={"60%"} h={5} color={INK} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Bar w={"94%"} h={5} color={muted ? HAIR : HAIR_2} />
          <Bar w={"72%"} h={5} color={muted ? HAIR : HAIR_2} />
        </div>
      )}
    </div>
  );
  return (
    <div className={`flex items-start gap-2.5 ${muted ? "opacity-70" : ""}`}>
      <Dot size={18} fill={SOFT} />
      {body}
    </div>
  );
}

/* 2 · Surface the structure — two pill columns -------------------------- */
function StructureB() {
  const LEFT = [["Discover", 28], ["Define", 12], ["Frame", 15], ["Decide", 9], ["Iterate", 21], ["Align", 7]];
  const RIGHT = [["Goal", 17], ["Constraint", 8], ["Risk", 14], ["Trade-off", 12], ["Owner", 18], ["Blocker", 21]];
  return (
    <div className="absolute inset-0 px-7 pb-10 pt-6">
      <div className="flex h-full w-full gap-3">
        <PillCol title="Phase" pills={LEFT} fill={SOFT_2} />
        <PillCol title="Decision type" pills={RIGHT} fill={PANEL} bordered />
      </div>
    </div>
  );
}

function PillCol({ title, pills, fill, bordered }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <span style={{ fontSize: 10, color: MUTED, fontWeight: 500, paddingLeft: 4 }}>{title}</span>
      <div className="flex flex-col gap-1.5">
        {pills.map(([label, count]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-[8px] px-2.5 py-1.5"
            style={{ background: fill, border: `1px solid ${bordered ? HAIR : "transparent"}` }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, color: INK }}>{label}</span>
            <span
              className="rounded-[3px] px-1"
              style={{ background: PANEL, fontSize: 9, fontWeight: 600, color: INK, lineHeight: "12px", border: `1px solid ${HAIR}` }}
            >
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3 · Test the risky moments — dotted canvas + mini cards + drag chip --- */
function PrototypeB() {
  return (
    <div className="absolute inset-0">
      <Window style={{ top: 22, left: 28, right: 28, bottom: 42 }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${HAIR} 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 p-4">
          <Mini />
          <Mini />
          <Mini ringed />
          <Mini />
        </div>

        {/* Drag chip */}
        <div
          className="absolute flex items-center gap-1 rounded-[6px] px-2 py-1"
          style={{
            top: "44%",
            left: "46%",
            background: INK,
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            boxShadow: "0 6px 14px -6px rgba(0,0,0,0.35)",
          }}
        >
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "#fff" }} />
          <span>Cluster</span>
        </div>
        <svg className="absolute" style={{ top: "50%", left: "54%", width: 14, height: 18 }} viewBox="0 0 14 18" aria-hidden>
          <path d="M 1 1 L 13 9 L 6.5 10.5 L 4.5 16 Z" fill={INK} stroke="#fff" strokeWidth="1" />
        </svg>
      </Window>
    </div>
  );
}

function Mini({ ringed }) {
  return (
    <div
      className="relative flex flex-col gap-1.5 rounded-[8px] p-2.5"
      style={{
        background: PANEL,
        border: `1px solid ${ringed ? INK : HAIR}`,
        boxShadow: ringed ? `0 0 0 2px ${SOFT_2}` : "0 1px 0 rgba(0,0,0,0.02)",
      }}
    >
      <Bar w={56} h={6} color={INK} />
      <div className="flex flex-col gap-1">
        <Bar w={"95%"} h={4} color={SOFT} radius={2} />
        <Bar w={"75%"} h={4} color={SOFT} radius={2} />
        <Bar w={"85%"} h={4} color={SOFT} radius={2} />
      </div>
    </div>
  );
}

/* 4 · Refine through handoff — timestamped notes panel ------------------ */
function HandoffB() {
  return (
    <div className="absolute inset-0">
      <Window style={{ top: 22, left: 28, right: 28, bottom: 42 }}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <div className="flex items-center gap-2">
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: INK }} />
              <Bar w={64} h={6} color={INK} />
            </div>
            <Bar w={16} h={4} color={MUTED} />
          </div>
          <div className="flex flex-1 flex-col gap-2 px-4 py-3">
            <Note checked time="0:00" />
            <Note highlight time="0:42" />
            <Note time="1:18" />
            <Note muted time="—" />
          </div>
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop: `1px solid ${HAIR}` }}>
            <Pill label="A11y · AA" />
            <Pill label="Spec ready" outline />
          </div>
        </div>
      </Window>
    </div>
  );
}

function Note({ checked, highlight, muted, time }) {
  return (
    <div
      className="flex items-center gap-2 rounded-[6px] px-2 py-1.5"
      style={{ background: highlight ? BAND : "transparent" }}
    >
      <span
        className="flex size-3.5 shrink-0 items-center justify-center rounded-[3px]"
        style={{ background: checked ? INK : PANEL, border: `1px solid ${checked ? INK : HAIR}` }}
      >
        {checked ? (
          <svg viewBox="0 0 10 10" width="8" height="8" aria-hidden>
            <path d="M 1.5 5 L 4 7.4 L 8.5 2.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : null}
      </span>
      <Bar w={"40%"} h={6} color={muted ? SOFT : INK} />
      <span style={{ fontSize: 9, color: MUTED, fontFamily: "ui-monospace, monospace", marginLeft: "auto" }}>
        {time}
      </span>
    </div>
  );
}

function Pill({ label, outline }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2 py-1"
      style={{ background: outline ? PANEL : SOFT_2, border: `1px solid ${outline ? HAIR : INK}` }}
    >
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: INK }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: INK }}>{label}</span>
    </div>
  );
}
