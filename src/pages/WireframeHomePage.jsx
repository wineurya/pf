/**
 * Wireframe / low-fi layout exploration — Spotify shell × return.dev content.
 * Route: `/wireframe/home`.
 *
 * Keeps Spotify's structural skeleton (persistent left sidebar, rounded main
 * panel, sticky bottom strip) but strips the contents to return.dev minimum:
 * indexed text rows (year · title · tagline · kind) instead of cover-art
 * rails, hairline dividers, mono numerals, no imagery.
 */

function Bar({ w = "100%", h = 10, tone = "mid" }) {
  const bg =
    tone === "strong"
      ? "bg-neutral-300"
      : tone === "soft"
        ? "bg-neutral-800"
        : "bg-neutral-700";
  return (
    <span
      aria-hidden
      className={`block rounded-sm ${bg}`}
      style={{ width: w, height: h }}
    />
  );
}

function StatusDot({ label, tone = "live" }) {
  const dot = tone === "live" ? "bg-emerald-500" : "bg-neutral-500";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
}

/* ───────────────────────── Sidebar ───────────────────────── */

function SidebarBrand() {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-neutral-900 px-4 py-5">
      <Bar w={120} h={13} tone="strong" />
      <Bar w={80} h={9} />
    </div>
  );
}

function SidebarNav() {
  const items = [
    { label: "Work", active: true },
    { label: "Studio" },
    { label: "Process" },
    { label: "Contact" },
  ];
  return (
    <nav className="rounded-lg bg-neutral-900 px-2 py-3">
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between px-3 py-2 text-[13px]"
          >
            <span
              className={item.active ? "text-neutral-100" : "text-neutral-500"}
            >
              {item.label}
            </span>
            {item.active ? (
              <span className="font-mono text-[10px] text-neutral-600">→</span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SidebarLibrary() {
  const rows = [
    { year: "2025", kind: "Case" },
    { year: "2025", kind: "Case" },
    { year: "2024", kind: "Case" },
    { year: "2024", kind: "Note" },
    { year: "2023", kind: "Case" },
    { year: "2023", kind: "Study" },
  ];
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-lg bg-neutral-900 px-2 py-4">
      <div className="flex items-baseline justify-between px-3 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
          Library
        </span>
        <span className="font-mono text-[10px] tabular-nums text-neutral-600">
          {String(rows.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-col">
        {rows.map((r, i) => (
          <li
            key={i}
            className="grid grid-cols-[36px_1fr_auto] items-center gap-3 border-t border-neutral-800 px-3 py-2.5 first:border-t-0"
          >
            <span className="font-mono text-[10px] text-neutral-500">{r.year}</span>
            <Bar w="80%" h={9} tone="strong" />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-600">
              {r.kind}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex w-[280px] shrink-0 flex-col gap-2">
      <SidebarBrand />
      <SidebarNav />
      <SidebarLibrary />
    </aside>
  );
}

/* ─────────────────────── Main panel ─────────────────────── */

function MainTopBar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-6 rounded-t-lg border-b border-neutral-800 bg-neutral-900/95 px-6 py-3 backdrop-blur">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
          /
        </span>
        <Bar w={90} h={10} tone="strong" />
      </div>
      <div className="flex h-7 max-w-[260px] flex-1 items-center gap-2 rounded-md border border-neutral-800 px-2.5">
        <span className="font-mono text-[10px] text-neutral-600">⌘K</span>
        <span className="font-mono text-[11px] text-neutral-500">search</span>
      </div>
      <StatusDot label="Available · Atlanta" />
    </div>
  );
}

function FeaturedHero() {
  return (
    <section className="border-b border-neutral-800 px-6 pt-12 pb-10">
      <div className="flex flex-col gap-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
          Featured · 01
        </span>
        <div className="flex flex-col gap-3">
          <Bar w="70%" h={28} tone="strong" />
          <Bar w="45%" h={14} />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-neutral-500">
          <span>2025</span>
          <span className="text-neutral-700" aria-hidden>·</span>
          <span>Mobile · Coaching</span>
          <span className="text-neutral-700" aria-hidden>·</span>
          <span>4 min read</span>
        </div>
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 border-b border-neutral-200 pb-0.5 text-[12px] text-neutral-100">
            Open case study
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function IndexRow({ year, kind = "Case" }) {
  return (
    <li className="group grid grid-cols-[64px_1fr_auto] items-center gap-6 border-t border-neutral-800 py-3">
      <span className="font-mono text-[11px] tabular-nums text-neutral-500">
        {year}
      </span>
      <div className="flex items-center gap-3">
        <Bar w={130} h={11} tone="strong" />
        <span className="text-neutral-700" aria-hidden>·</span>
        <Bar w={180} h={9} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">
        {kind}
      </span>
    </li>
  );
}

function IndexSection({ title, rows, totalLabel }) {
  return (
    <section className="px-6 pt-10 pb-2">
      <div className="flex items-baseline justify-between pb-1">
        <h2 className="text-[13px] font-medium text-neutral-100">{title}</h2>
        <span className="font-mono text-[10px] tabular-nums text-neutral-500">
          {totalLabel ?? String(rows.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-col">
        {rows.map((r, i) => (
          <IndexRow key={i} year={r.year} kind={r.kind} />
        ))}
        <li className="border-t border-neutral-800" aria-hidden />
      </ul>
      <div className="pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
          Show all →
        </span>
      </div>
    </section>
  );
}

function MainPanel() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-neutral-900">
      <MainTopBar />
      <div className="flex-1 overflow-y-auto">
        <FeaturedHero />
        <IndexSection
          title="Work"
          rows={[
            { year: "2025", kind: "Case" },
            { year: "2025", kind: "Case" },
            { year: "2024", kind: "Case" },
            { year: "2024", kind: "Case" },
            { year: "2023", kind: "Case" },
          ]}
        />
        <IndexSection
          title="Writing"
          rows={[
            { year: "2025", kind: "Note" },
            { year: "2025", kind: "Note" },
            { year: "2024", kind: "Note" },
          ]}
        />
        <IndexSection
          title="Studio"
          rows={[
            { year: "2025", kind: "Study" },
            { year: "2024", kind: "Study" },
          ]}
        />
        <div className="h-8" />
      </div>
    </main>
  );
}

/* ──────────────────── Sticky bottom strip ──────────────────── */

function NowAvailableBar() {
  return (
    <footer className="flex items-center justify-between gap-6 rounded-lg bg-neutral-900 px-5 py-3 font-mono text-[11px]">
      <div className="flex items-center gap-3 text-neutral-400">
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
        <span className="uppercase tracking-[0.12em]">Currently</span>
        <span className="text-neutral-200">Open to product design roles</span>
      </div>
      <div className="flex items-center gap-4 text-neutral-500">
        <span>Atlanta · EST</span>
        <span className="text-neutral-700" aria-hidden>·</span>
        <span className="text-neutral-200 underline decoration-neutral-700 underline-offset-[3px]">
          Email
        </span>
        <span className="text-neutral-200 underline decoration-neutral-700 underline-offset-[3px]">
          LinkedIn
        </span>
        <span className="text-neutral-200 underline decoration-neutral-700 underline-offset-[3px]">
          Résumé
        </span>
      </div>
    </footer>
  );
}

/* ────────────────────────── Banner ────────────────────────── */

function WireframeBanner() {
  return (
    <div className="fixed left-1/2 top-3 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 shadow-lg">
      <span className="size-1.5 rounded-full bg-neutral-400" aria-hidden />
      <span className="font-mono font-semibold uppercase tracking-[0.12em]">
        Wireframe
      </span>
      <span className="text-neutral-700">·</span>
      <span className="text-neutral-400">Spotify shell × return.dev content</span>
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export function WireframeHomePage() {
  return (
    <div className="relative grid h-dvh grid-rows-[1fr_auto] gap-2 bg-black p-2 text-neutral-200">
      <WireframeBanner />
      <div className="grid min-h-0 grid-cols-[280px_1fr] gap-2">
        <Sidebar />
        <MainPanel />
      </div>
      <NowAvailableBar />
    </div>
  );
}

export default WireframeHomePage;
