import { Link } from "react-router-dom";

// ─── Token data ───────────────────────────────────────────────────────────────

/**
 * Neutral ramp rows — OKLCH L must match `src/styles/tokens.css` @theme `--color-neutral-*`.
 * Lightness is informational on the design page; swatches use ring contrast from `oklchL`.
 */
const NEUTRAL_SCALE = [
  { step: "0", oklchL: 1, usage: "Pure white shell · foundation for page surfaces" },
  { step: "50", oklchL: 0.985, usage: "Soft wash · referenced by --wx-surface-soft" },
  { step: "100", oklchL: 0.96, usage: "Pale gray fill · referenced by --wx-surface" },
  { step: "200", oklchL: 0.92, usage: "Ramp step · compose semantic tokens from these stops" },
  { step: "300", oklchL: 0.81778, usage: "Ramp step · compose semantic tokens from these stops" },
  { step: "400", oklchL: 0.71556, usage: "Ramp step · compose semantic tokens from these stops" },
  { step: "500", oklchL: 0.61333, usage: "Mid gray · referenced by --wx-mute-2" },
  { step: "600", oklchL: 0.51111, usage: "Secondary ink · referenced by --wx-muted" },
  { step: "700", oklchL: 0.40889, usage: "Ramp step · compose semantic tokens from these stops" },
  { step: "800", oklchL: 0.30667, usage: "Ramp step · compose semantic tokens from these stops" },
  { step: "900", oklchL: 0.20444, usage: "Near-black body · referenced by --wx-ink" },
  { step: "950", oklchL: 0.10222, usage: "Ramp step · compose semantic tokens from these stops" },
  { step: "1000", oklchL: 0, usage: "Maximum contrast anchor · referenced by --wx-black" },
];

const COLOR_GROUPS = [
  {
    label: "Surface",
    description: "Page and component background fills.",
    items: [
      {
        name: "Page BG",
        cssVar: "--wx-page-bg",
        primitive: "--color-neutral-0",
        bg: "var(--wx-page-bg)",
        usage: "Root page background",
      },
      {
        name: "White",
        cssVar: "--wx-white",
        primitive: "--color-neutral-0",
        bg: "var(--wx-white)",
        usage: "Card surfaces, inputs",
      },
      {
        name: "Surface",
        cssVar: "--wx-surface",
        primitive: "--color-neutral-100",
        bg: "var(--wx-surface)",
        usage: "Chips, filled tabs, subtle wells",
      },
      {
        name: "Surface Soft",
        cssVar: "--wx-surface-soft",
        primitive: "--color-neutral-50",
        bg: "var(--wx-surface-soft)",
        usage: "Hover fills, inactive sections",
      },
    ],
  },
  {
    label: "Ink",
    description: "Text and icon fill values.",
    items: [
      {
        name: "Ink",
        cssVar: "--wx-ink",
        primitive: "--color-neutral-900",
        bg: "var(--wx-ink)",
        usage: "Primary body text, headings",
      },
      {
        name: "Muted",
        cssVar: "--wx-muted",
        primitive: "--color-neutral-600",
        bg: "var(--wx-muted)",
        usage: "Labels, secondary copy, captions",
      },
      {
        name: "Mute 2",
        cssVar: "--wx-mute-2",
        primitive: "--color-neutral-500",
        bg: "var(--wx-mute-2)",
        usage: "Tertiary text, placeholders",
      },
    ],
  },
  {
    label: "Accent",
    description: "Brand accent system — primary-led, extending teal · violet · amber.",
    items: [
      {
        name: "Primary",
        cssVar: "--wx-primary",
        bg: "var(--wx-primary)",
        usage: "CTAs, links, active states",
      },
      {
        name: "Teal",
        cssVar: "--wx-accent-teal",
        bg: "var(--wx-accent-teal)",
        usage: "Tool tags, alternate accent",
      },
      {
        name: "Violet",
        cssVar: "--wx-accent-violet",
        bg: "var(--wx-accent-violet)",
        usage: "Gradient, highlight variant",
      },
      {
        name: "Amber",
        cssVar: "--wx-accent-amber",
        bg: "var(--wx-accent-amber)",
        usage: "Warnings, warm highlights",
      },
    ],
  },
];

const BORDER_TOKENS = [
  { name: "Hairline",    cssVar: "--wx-border-hairline", opacity: "4.5%", usage: "Ultra-fine separators" },
  { name: "Faint",       cssVar: "--wx-border-faint",    opacity: "5%",   usage: "Card inner outlines" },
  { name: "Soft",        cssVar: "--wx-border-soft",     opacity: "6%",   usage: "Section dividers, card edges" },
  { name: "Muted",       cssVar: "--wx-border-muted",    opacity: "8%",   usage: "Input rings, hover outlines" },
  { name: "Outline Ink", cssVar: "--wx-outline-ink",     opacity: "12%",  usage: "Button rings, strong outlines" },
];

const FONT_FAMILIES = [
  {
    cssVar: "--font-display",
    label: "Display / titles",
    stack:
      "ui-rounded, SF Pro Rounded, SF Pro Display, SF Pro Text, system-ui…",
    usage: "Hero, section titles, page titles, stats, wordmark — larger / bolder; SF Rounded-led.",
    specimenFontVar: "var(--font-display)",
    mono: false,
  },
  {
    cssVar: "--font-body",
    label: "Body",
    stack: "SF Pro Text, SF Pro Display, system-ui…",
    usage: "Paragraphs, meta, UI chrome, kickers, inputs — SF Pro only (no Rounded).",
    specimenFontVar: "var(--font-body)",
    mono: false,
  },
  {
    cssVar: "--font-mono",
    label: "Mono",
    stack: "ui-monospace, SF Mono, Menlo, Monaco, Consolas…",
    usage: "Code, token values, tabular data",
    specimenFontVar: undefined,
    mono: true,
  },
];

const TYPE_SCALE = [
  {
    label: "Meta",
    cssVar: "--wx-text-meta-size",
    size: "13px",
    className: "wx-text-meta",
    sample: "Coaching · Consumer mobile — 2024",
    usage: "Captions, back links, fine print, availability",
  },
  {
    label: "Overline",
    cssVar: "--wx-text-overline-size",
    size: "12px",
    className: "wx-text-overline wx-text-section-kicker",
    sample: "SELECTED WORK",
    usage: "Section kickers, form labels — uppercase only",
  },
  {
    label: "Small",
    cssVar: "--wx-text-sm-size",
    size: "14px",
    className: "wx-text-sm",
    sample: "Dense UI body, stat labels, tabs, case steps",
    usage: "Dense body, stat labels, tabs",
  },
  {
    label: "Body Secondary",
    cssVar: "--wx-text-body-secondary-size",
    size: "15 → 16px",
    className: "wx-text-body-secondary",
    sample: "Subheads, card summaries, case ledes, FAQ answers, studio intro.",
    usage: "Primary body text, card summaries",
  },
  {
    label: "Pullquote",
    cssVar: "--wx-text-pullquote-size",
    size: "17 → 20px",
    className: "wx-text-pullquote",
    sample: "Highlighted insight or editorial callout.",
    usage: "Pullquotes, highlighted prose sections",
  },
  {
    label: "Section Title",
    cssVar: "--wx-text-section-title-size",
    size: "24 → 30px",
    className: "wx-text-section-title",
    sample: "Work",
    usage: "Home h2, aside section headers",
  },
  {
    label: "Page Title",
    cssVar: "--wx-text-page-title-size",
    size: "30 → 36px",
    className: "wx-text-page-title",
    sample: "Avance",
    usage: "Case study h1, simple page headers",
  },
];

const LETTER_SPACING = [
  { label: "Tighter",   value: "0em", tw: "tracking-tighter" },
  { label: "Tight",     value: "0em", tw: "tracking-tight" },
  { label: "Normal",    value: "0em",      tw: "tracking-normal" },
  { label: "Wide",      value: "0.025em",  tw: "tracking-wide" },
  { label: "Wider",     value: "0.05em",   tw: "tracking-wider" },
  { label: "Kicker",    value: "0.18em",   tw: "" },
];

const LINE_HEIGHTS = [
  { label: "None",    value: "1",     usage: "Display, tight headings" },
  { label: "Tight",   value: "1.1",   usage: "Case title, section title" },
  { label: "Snug",    value: "1.25",  usage: "Subsection titles" },
  { label: "Normal",  value: "1.5",   usage: "Meta, overline, UI text" },
  { label: "Relaxed", value: "1.625", usage: "Body secondary, small body" },
  { label: "Loose",   value: "2",     usage: "Spacious editorial" },
];

const FLUID_SPACING = [
  { cssVar: "--space-fluid-xs",  label: "xs",  range: "4 – 8px",    maxPx: 8   },
  { cssVar: "--space-fluid-sm",  label: "sm",  range: "8 – 16px",   maxPx: 16  },
  { cssVar: "--space-fluid-md",  label: "md",  range: "16 – 24px",  maxPx: 24  },
  { cssVar: "--space-fluid-lg",  label: "lg",  range: "24 – 40px",  maxPx: 40  },
  { cssVar: "--space-fluid-xl",  label: "xl",  range: "32 – 64px",  maxPx: 64  },
  { cssVar: "--space-fluid-2xl", label: "2xl", range: "48 – 96px",  maxPx: 96  },
  { cssVar: "--space-fluid-3xl", label: "3xl", range: "64 – 128px", maxPx: 128 },
  { cssVar: "--space-fluid-4xl", label: "4xl", range: "96 – 192px", maxPx: 192 },
];

/** Subset of `@theme` `--spacing-*` in tokens.css — Tailwind `p-*`, `gap-*`, `m-*` map here. */
const SPACING_THEME_SAMPLES = [
  { step: "1",   rem: "0.25rem", px: 4,   usage: "Micro nudges, tight icon gaps" },
  { step: "2",   rem: "0.5rem",  px: 8,   usage: "Dense stacks, compact controls" },
  { step: "3",   rem: "0.75rem", px: 12,  usage: "Inline field groups" },
  { step: "4",   rem: "1rem",    px: 16,  usage: "Card padding, default gap step" },
  { step: "6",   rem: "1.5rem",  px: 24,  usage: "Section sub-blocks" },
  { step: "8",   rem: "2rem",    px: 32,  usage: "Comfortable vertical bands" },
  { step: "10",  rem: "2.5rem",  px: 40,  usage: "Wide component breathing room" },
  { step: "12",  rem: "3rem",    px: 48,  usage: "Large split gutters" },
  { step: "16",  rem: "4rem",    px: 64,  usage: "Hero / marketing vertical air" },
];

const BREAKPOINT_TOKENS = [
  { cssVar: "--breakpoint-xs",  value: "23.4375rem (~375px)", tw: "xs",  usage: "Device reference; not always a Tailwind prefix" },
  { cssVar: "--breakpoint-sm",  value: "40rem (640px)",       tw: "sm",  usage: "First conventional jump — type and density" },
  { cssVar: "--breakpoint-md",  value: "48rem (768px)",       tw: "md",  usage: "Tablet split, two-column aside" },
  { cssVar: "--breakpoint-lg",  value: "64rem (1024px)",      tw: "lg",  usage: "Desktop exploration chrome" },
  { cssVar: "--breakpoint-xl",  value: "80rem (1280px)",      tw: "xl",  usage: "Wide layout, max-width alignment" },
  { cssVar: "--breakpoint-2xl", value: "96rem (1536px)",      tw: "2xl", usage: "Extra-wide displays" },
  { cssVar: "--breakpoint-3xl", value: "120rem (1920px)",     tw: "3xl", usage: "Ultra-wide / large canvases" },
];

const LAYOUT_TOKENS = [
  { cssVar: "--wx-pad-x",               value: "clamp(1.25rem, 4vw, 3.75rem)", label: "Page padding X",       usage: "Horizontal inset on exploration / site-canvas shells" },
  { cssVar: "--wx-space-section",       value: "clamp(1.75rem, 4vw, 2.5rem)", label: "Section spacing",       usage: "Vertical gap between stacked aside / section blocks" },
  { cssVar: "--layout-gutter",          value: "clamp(1rem, 4vw, 3rem)",      label: "Layout gutter",        usage: "Global gutter when not using --wx-pad-x" },
  { cssVar: "--layout-max-width",       value: "80rem",                      label: "Max width",            usage: "Primary marketing column cap (1280px)" },
  { cssVar: "--layout-max-width-sm",    value: "40rem",                      label: "Max width (SM)",       usage: "Reading column, narrow forms" },
  { cssVar: "--layout-max-width-lg",    value: "96rem",                      label: "Max width (LG)",       usage: "Wide bands, bento-style shells" },
  { cssVar: "--wx-explore-aside-basis", value: "min(42%, 36rem)",             label: "Aside basis",           usage: "Left rail in work / case split layout" },
  { cssVar: "--wx-max-copy",            value: "31.3125rem",                 label: "Max copy width",        usage: "Overlay text rail before it meets the mock" },
  { cssVar: "--wx-work-overlay-pad-x",  value: "clamp(1rem, 3.5vw, 1.5rem)", label: "Work overlay pad X",    usage: "Card scrim / footer copy horizontal inset" },
  { cssVar: "--wx-work-overlay-pad-y",  value: "clamp(1rem, 3vw, 1.375rem)", label: "Work overlay pad Y",   usage: "Card scrim / footer copy vertical inset" },
  { cssVar: "--wx-work-copy-gap",       value: "0.5rem",                     label: "Work copy stack gap",   usage: "Title ↔ one-liner inside overlays" },
  { cssVar: "--wx-gallery-gap",         value: "12px",                       label: "Gallery gap",           usage: "Gallery grid gutter between frames" },
];

const RADIUS_TOKENS = [
  { cssVar: "--radius-xs",          value: "2px",            label: "XS",          usage: "Fine chip corners" },
  { cssVar: "--radius-sm",          value: "4px",            label: "SM",          usage: "Inputs, subtle cards" },
  { cssVar: "--radius-md",          value: "6px",            label: "MD",          usage: "Buttons, small panels" },
  { cssVar: "--wx-radius-card",     value: "8px",            label: "Card",        usage: "Work cards, case wells" },
  { cssVar: "--wx-radius-segment",  value: "12px",           label: "Segment",     usage: "Active tab pill" },
  { cssVar: "--wx-radius-track",    value: "16px",           label: "Track",       usage: "Tab track container" },
  { cssVar: "--radius-3xl",         value: "24px",           label: "3XL",         usage: "Large decorative shapes" },
  { cssVar: "--radius-pill",        value: "624.9375rem",    label: "Pill",        usage: "Avatar chips, full pill" },
];

const DURATION_TOKENS = [
  { cssVar: "--duration-instant",  value: "0ms",   label: "Instant",  barPct: 0,   usage: "Visibility toggles" },
  { cssVar: "--duration-fast",     value: "100ms", label: "Fast",     barPct: 12,  usage: "Icon swaps, checkboxes" },
  { cssVar: "--duration-normal",   value: "200ms", label: "Normal",   barPct: 25,  usage: "Hover states" },
  { cssVar: "--duration-moderate", value: "300ms", label: "Moderate", barPct: 37,  usage: "Panel slides, menus" },
  { cssVar: "--duration-slow",     value: "400ms", label: "Slow",     barPct: 50,  usage: "Tab transitions" },
  { cssVar: "--duration-slower",   value: "600ms", label: "Slower",   barPct: 75,  usage: "Page-level motion" },
  { cssVar: "--duration-slowest",  value: "800ms", label: "Slowest",  barPct: 100, usage: "Cinematic reveals" },
];

const EASING_TOKENS = [
  { cssVar: "--ease-fluid",          value: "cubic-bezier(0.3, 0, 0, 1)",          label: "Fluid",          usage: "Default UI motion — smooth deceleration" },
  { cssVar: "--ease-snappy",         value: "cubic-bezier(0.2, 0, 0, 1)",          label: "Snappy",         usage: "Tight, immediate UI responses" },
  { cssVar: "--ease-spring",         value: "cubic-bezier(0.34, 1.56, 0.64, 1)",   label: "Spring",         usage: "Menus, drawers, popovers — slight overshoot" },
  { cssVar: "--ease-bounce",         value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)", label: "Bounce",      usage: "Playful entries, badge pop-ins" },
  { cssVar: "--ease-expo-out",       value: "cubic-bezier(0.19, 1, 0.22, 1)",      label: "Expo Out",       usage: "Hero reveals, page transitions" },
  { cssVar: "--ease-back-out",       value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", label: "Back Out",   usage: "Scale-up reveals with pull-back" },
  { cssVar: "--ease-ui-strong-out",  value: "cubic-bezier(0.23, 1, 0.32, 1)",      label: "UI Strong Out",  usage: "Full-screen layout morphs, crossfades" },
  { cssVar: "--ease-morph-in-out",   value: "cubic-bezier(0.77, 0, 0.175, 1)",     label: "Morph In/Out",   usage: "Drawer-like moves, content swaps" },
];

const COMPONENT_TOKENS = [
  { cssVar: "--wx-radius-card",     value: "8px",            label: "Card radius",        where: "Work cards, MetaBlock wells" },
  { cssVar: "--wx-radius-segment",  value: "12px",           label: "Segment radius",     where: "Active tab in SectionTabRail" },
  { cssVar: "--wx-radius-track",    value: "16px",           label: "Track radius",       where: "Tab container in SectionTabRail" },
  { cssVar: "--wx-tab-pill-height", value: "2.375rem / 38px",label: "Tab height",         where: "SectionTabRail" },
  { cssVar: "--wx-gallery-gap",     value: "12px",           label: "Gallery gap",        where: "Work card grid gutter" },
  { cssVar: "--wx-text-aside-footer-size", value: "0.625rem / 10px", label: "Aside label size", where: "MetaBlock label, tag group headers" },
  { cssVar: "--wx-text-kicker-tracking",   value: "0.18em",          label: "Kicker tracking",  where: "Section kickers, overline elements" },
  { cssVar: "--wx-text-nugget",            value: "0.75rem",         label: "Work nugget type", where: "Default work-card chips (sentence case)" },
  { cssVar: "--wx-text-nugget-warm",       value: "0.7rem",          label: "Work nugget (warm)", where: "Warm-footer / Figma-style pill chips" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TokenBadge({ children }) {
  return (
    <code className="font-mono text-[11px] bg-[var(--wx-surface)] text-[var(--wx-muted)] px-1.5 py-0.5 rounded leading-none">
      {children}
    </code>
  );
}

/** Matches subsection titles across Color (and keeps Border / Gradient aligned). */
function ColorSubsectionHeader({ title, description }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)]">{title}</p>
      {description ? (
        <p className="wx-text-body-secondary text-[var(--wx-muted)] sm:max-w-[min(28rem,100%)] sm:text-right leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}

/** Inset ring so chips read on both near-white and near-black (avoid relying on var() in shadow). */
function swatchInsetRing(oklchL) {
  if (oklchL === undefined) return "inset 0 0 0 1px rgba(0, 0, 0, 0.08)";
  return oklchL >= 0.55
    ? "inset 0 0 0 1px rgba(0, 0, 0, 0.12)"
    : "inset 0 0 0 1px rgba(255, 255, 255, 0.22)";
}

/** One row per token — same geometry as Border rows (swatch + copy + badge column). */
function ColorTokenRow({ label, cssVar, primitive, usage, bg, oklchL }) {
  const swatchBg =
    oklchL !== undefined ? { backgroundColor: `oklch(${oklchL} 0 0)` } : { background: bg };

  return (
    <div className="flex items-start gap-4 px-3 py-3">
      <div
        className="size-10 shrink-0 rounded-[var(--wx-radius-card)]"
        style={{
          ...swatchBg,
          boxShadow: swatchInsetRing(oklchL),
        }}
        aria-hidden
      />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
          <p className="text-xs font-medium text-[var(--wx-ink)]">{label}</p>
          {oklchL !== undefined ? (
            <span
              className="font-mono wx-text-meta tabular-nums text-[var(--wx-mute-2)]"
              title="OKLCH lightness (chroma 0)"
            >
              L {(oklchL * 100).toFixed(1)}%
            </span>
          ) : null}
        </div>
        <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-snug">{usage}</p>
        {primitive ? (
          <p className="wx-text-meta text-[var(--wx-muted)]">
            Resolves to <TokenBadge>{primitive}</TokenBadge>
          </p>
        ) : null}
      </div>
      <div className="shrink-0 pt-0.5 text-right">
        <TokenBadge>{cssVar}</TokenBadge>
      </div>
    </div>
  );
}

/** Sticky rail: numbered index, title, readable lead, optional technical appendix in smaller type */
function SectionHeader({ index, title, headingId, lead, technicalNote }) {
  return (
    <div className="col-span-full lg:col-span-1 lg:sticky lg:top-[57px] lg:self-start lg:scroll-mt-[4.75rem]">
      <p className="wx-text-meta text-[var(--wx-muted)] tracking-wider mb-2">{index}</p>
      <h2 id={headingId} className="wx-text-section-title font-semibold text-[var(--wx-ink)]">
        {title}
      </h2>
      {lead ? (
        <p className="wx-text-body-secondary text-[var(--wx-ink)] mt-4 leading-relaxed max-w-[min(38rem,var(--layout-max-width-sm))]">{lead}</p>
      ) : null}
      {technicalNote ? (
        <p className="wx-text-meta text-[var(--wx-muted)] mt-3 leading-relaxed max-w-[min(38rem,var(--layout-max-width-sm))]">{technicalNote}</p>
      ) : null}
    </div>
  );
}

const PAGE_SECTIONS = [
  { id: "design-color", label: "Color" },
  { id: "design-typography", label: "Typography" },
  { id: "design-spacing-layout", label: "Spacing & layout" },
  { id: "design-radius", label: "Radius" },
  { id: "design-motion", label: "Motion" },
  { id: "design-components", label: "Components" },
];

function JumpNavLink({ id, children }) {
  return (
    <a
      href={`#${id}`}
      className="wx-text-meta text-[var(--wx-muted)] hover:text-[var(--wx-primary)] underline-offset-4 hover:underline transition-colors duration-[var(--duration-normal)] whitespace-nowrap"
    >
      {children}
    </a>
  );
}

function Divider() {
  return <div className="border-t border-[color:var(--wx-border-soft)]" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="site-canvas min-h-dvh bg-[var(--wx-page-bg)] text-[var(--wx-ink)]">

      {/* Sticky nav */}
      <header className="sticky top-0 z-20 border-b border-[color:var(--wx-border-soft)] bg-[var(--wx-page-bg)/95] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[900px] items-center gap-2 px-[var(--wx-pad-x)] h-14">
          <Link
            to="/"
            className="wx-text-meta font-medium text-[var(--wx-ink)] hover:text-[var(--wx-primary)] transition-colors duration-[var(--duration-normal)]"
          >
            wineury
          </Link>
          <span className="wx-text-meta text-[var(--wx-muted)]">/</span>
          <span className="wx-text-meta text-[var(--wx-muted)]">design-system</span>
        </div>
      </header>

      <div className="mx-auto max-w-[900px] px-[var(--wx-pad-x)] pb-32">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="pt-16 pb-14 lg:pt-20 lg:pb-16" aria-labelledby="design-system-title">
          <p className="wx-text-section-kicker text-[var(--wx-muted)] mb-5">Design System</p>
          <h1 id="design-system-title" className="wx-text-page-title font-semibold text-[var(--wx-ink)] max-w-[min(24rem,var(--layout-max-width-sm))] mb-5 leading-tight">
            The visual vocabulary.
          </h1>
          <div className="space-y-[var(--wx-space-section)] max-w-[min(36rem,var(--layout-max-width-sm))]">
            <p className="wx-text-body-secondary text-[var(--wx-ink)] leading-relaxed">
              This page is your map to how the portfolio looks and behaves: which colors mean “surface” versus “muted text,” how type scales behave, when to reach for fluid spacing versus Tailwind spacing, and where motion curves live in code.
            </p>
            <div className="rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] px-5 py-5 space-y-4">
              <p className="wx-text-sm font-semibold text-[var(--wx-ink)]">How to read it</p>
              <ul className="wx-text-body-secondary text-[var(--wx-muted)] list-disc list-outside pl-5 space-y-3 leading-relaxed">
                <li>
                  Start with each section summary on the left (or top on small screens)—that explains the{" "}
                  <span className="text-[var(--wx-ink)]">idea</span> before you scan the rows of tokens.
                </li>
                <li>
                  Token names (<TokenBadge>like this</TokenBadge>) match what you paste in CSS or Tailwind; the tables say where they are typically used.
                </li>
                <li>
                  Source of truth lives in{" "}
                  <TokenBadge>src/styles/tokens.css</TokenBadge>; exploration utilities hang off{" "}
                  <TokenBadge>src/exploration/styles/site-canvas.css</TokenBadge>.
                </li>
              </ul>
            </div>
            <nav className="pt-2" aria-label="Sections on this page">
              <p className="wx-text-sm font-semibold text-[var(--wx-ink)] mb-3">Jump to</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 list-none p-0 m-0">
                {PAGE_SECTIONS.map((s) => (
                  <li key={s.id}>
                    <JumpNavLink id={s.id}>{s.label}</JumpNavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ── 01  Color ──────────────────────────────────────────────────── */}
        <Divider />
        <section
          id="design-color"
          className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 scroll-mt-[calc(3.5rem+var(--spacing-4))]"
          aria-labelledby="heading-design-color"
        >
          <SectionHeader
            index="01"
            title="Color"
            headingId="heading-design-color"
            lead='Pick a semantic token (such as ink or surface) instead of grabbing a gray hex—so hover states, borders, and text stay visually aligned across the whole site.'
            technicalNote={
              <>
                Neutral numbers <TokenBadge>--color-neutral-*</TokenBadge> live in{" "}
                <TokenBadge>@theme</TokenBadge>; friendlier names map to those steps in{" "}
                <TokenBadge>tokens.css</TokenBadge> as <TokenBadge>--wx-*</TokenBadge>.
              </>
            }
          />

          <div className="space-y-10">
            {/* Neutral primitives — same row pattern as semantic groups */}
            <div className="space-y-3">
              <ColorSubsectionHeader
                title="Neutral scale"
                description="Rows run light → dark (0 → 1000). Swatches paint oklch(L 0 0) from token values so previews always match CSS."
              />
              <div className="space-y-2">
                <div
                  className="h-5 w-full rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)]"
                  style={{
                    backgroundImage: "linear-gradient(to right in oklch, oklch(1 0 0), oklch(0 0 0))",
                  }}
                  role="img"
                  aria-label="Continuous grayscale from white to black, left to right, interpolated in OKLCH"
                />
                <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-relaxed">
                  The strip is a continuous OKLCH gray for eyeballing transitions; the table lists named stops. Stops squeeze closer together toward the highlights on purpose—so mid-tones where UI chrome lives stay subtle.
                </p>
              </div>
              <div className="divide-y divide-[color:var(--wx-border-faint)] rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden bg-[var(--wx-page-bg)]">
                {NEUTRAL_SCALE.map(({ step, oklchL, usage }) => (
                  <ColorTokenRow
                    key={step}
                    label={`Neutral ${step}`}
                    cssVar={`--color-neutral-${step}`}
                    usage={usage}
                    oklchL={oklchL}
                  />
                ))}
              </div>
            </div>

            {/* Semantic aliases */}
            {COLOR_GROUPS.map((group) => (
              <div key={group.label} className="space-y-3">
                <ColorSubsectionHeader title={group.label} description={group.description} />
                <div className="divide-y divide-[color:var(--wx-border-faint)] rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden bg-[var(--wx-page-bg)]">
                  {group.items.map((item) => (
                    <ColorTokenRow
                      key={item.cssVar}
                      label={item.name}
                      cssVar={item.cssVar}
                      primitive={item.primitive}
                      usage={item.usage}
                      bg={item.bg}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Border tokens */}
            <div className="space-y-3">
              <ColorSubsectionHeader
                title="Border"
                description={
                  <>
                    Hairline strokes via{" "}
                    <TokenBadge>color-mix(in srgb, black X%, transparent)</TokenBadge>. Avoid raw gray borders.
                  </>
                }
              />
              <div className="divide-y divide-[color:var(--wx-border-faint)] rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden bg-[var(--wx-page-bg)]">
                {BORDER_TOKENS.map((b) => (
                  <div key={b.cssVar} className="flex items-start gap-4 px-3 py-3">
                    <div
                      className="size-10 shrink-0 rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)]"
                      style={{ border: `2px solid var(${b.cssVar})` }}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs font-medium text-[var(--wx-ink)]">{b.name}</p>
                      <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-snug">{b.usage}</p>
                      <p className="wx-text-meta text-[var(--wx-muted)]">
                        Mix <span className="font-mono tabular-nums">{b.opacity}</span> black
                      </p>
                    </div>
                    <div className="shrink-0 pt-0.5 text-right">
                      <TokenBadge>{b.cssVar}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient accent */}
            <div className="space-y-3">
              <ColorSubsectionHeader
                title="Gradient accent"
                description="Hero headline clip, sparkle mask — primary → violet → teal → amber at 125°."
              />
              <div className="rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden">
                <div className="h-12 w-full" style={{ background: "var(--wx-gradient-accent)" }} aria-hidden />
                <div className="border-t border-[color:var(--wx-border-faint)] px-3 py-3">
                  <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-relaxed">
                    Ships as <TokenBadge>--wx-gradient-accent</TokenBadge>; the hero wordmark consumes the same ramps through{" "}
                    <TokenBadge>--wx-headline-word-gradient</TokenBadge>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02  Typography ─────────────────────────────────────────────── */}
        <Divider />
        <section
          id="design-typography"
          className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 scroll-mt-[calc(3.5rem+var(--spacing-4))]"
          aria-labelledby="heading-design-typography"
        >
          <SectionHeader
            index="02"
            title="Typography"
            headingId="heading-design-typography"
            lead="Rounded display type carries headlines and standout numbers; SF Pro carries everything you actually read—paragraphs, labels, and dense UI. Match that split and the portfolio feels consistent rather than accidental."
            technicalNote={
              <>
                Families are <TokenBadge>--font-display</TokenBadge> (SF Pro Rounded–led via <TokenBadge>ui-rounded</TokenBadge>) and <TokenBadge>--font-body</TokenBadge> (SF Pro Text / Display only),
                defined in <TokenBadge>tokens.css</TokenBadge>. Utilities such as <TokenBadge>.wx-text-meta</TokenBadge> bind family, size, and line-height in{" "}
                <TokenBadge>site-canvas.css</TokenBadge>.
              </>
            }
          />

          <div className="space-y-10">

            {/* Font families */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Font families</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Each specimen below maps to one CSS variable. Reach for display on marketing titles; reach for body on sentences and chrome.
              </p>
              <div className="space-y-0">
                {FONT_FAMILIES.map((fam) => (
                  <div
                    key={fam.cssVar}
                    className="flex items-start justify-between gap-6 py-4 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xl tracking-tight text-[var(--wx-ink)] ${fam.mono ? "font-mono" : "font-medium"}`}
                        style={fam.specimenFontVar ? { fontFamily: fam.specimenFontVar } : undefined}
                      >
                        {fam.mono ? "0123456789 Aa Bb Cc" : "Aa Bb Cc Dd Ee 0123"}
                      </p>
                      <p className="wx-text-body-secondary text-[var(--wx-muted)] mt-2 leading-relaxed">{fam.usage}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1 pt-0.5">
                      <p className="wx-text-sm font-semibold text-[var(--wx-ink)]">{fam.label}</p>
                      <TokenBadge>{fam.cssVar}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Type scale */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Type scale</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Each row is a ready-made combination: the class sets <TokenBadge>font-family</TokenBadge>, <TokenBadge>font-size</TokenBadge>, and <TokenBadge>line-height</TokenBadge>. Add{" "}
                <TokenBadge>font-weight</TokenBadge> separately when you need extra emphasis.
              </p>
              <div className="space-y-0">
                {TYPE_SCALE.map((step) => (
                  <div
                    key={step.cssVar}
                    className="py-5 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <p className={`${step.className} text-[var(--wx-ink)] leading-tight`}>
                        {step.sample}
                      </p>
                      <div className="shrink-0 text-right space-y-0.5 pt-0.5">
                        <p className="text-[11px] font-semibold text-[var(--wx-ink)]">{step.label}</p>
                        <p className="font-mono text-[10px] text-[var(--wx-muted)]">{step.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-snug">{step.usage}</p>
                      <TokenBadge>{step.cssVar}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Letter spacing + line height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Letter spacing</p>
                <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed">
                  Visual density control: widen all-caps kickers; keep body copy near the default unless you have a typography reason not to.
                </p>
                <div className="space-y-3">
                  {LETTER_SPACING.map((t) => (
                    <div key={t.label} className="flex items-center gap-3">
                      <span
                        className={`w-10 text-sm text-[var(--wx-ink)] font-medium ${t.tw}`}
                        style={t.tw === "" ? { letterSpacing: t.value } : undefined}
                      >
                        Aa
                      </span>
                      <div className="flex-1 h-px bg-[var(--wx-border-faint)]" />
                      <span className="wx-text-meta text-[var(--wx-muted)] shrink-0 text-right">
                        {t.label} · <span className="font-mono">{t.value}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Line height</p>
                <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed">
                  Titles sit tight; prose gets more breathing room so multi-line paragraphs stay comfortable on long scrolls.
                </p>
                <div className="space-y-3">
                  {LINE_HEIGHTS.map((l) => (
                    <div key={l.label} className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[var(--wx-muted)] shrink-0 w-12">{l.value}</span>
                      <div className="flex-1 h-px bg-[var(--wx-border-faint)]" />
                      <span className="wx-text-meta text-[var(--wx-muted)] shrink-0 text-right">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03  Spacing & layout ─────────────────────────────────────────── */}
        <Divider />
        <section
          id="design-spacing-layout"
          className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 scroll-mt-[calc(3.5rem+var(--spacing-4))]"
          aria-labelledby="heading-design-spacing-layout"
        >
          <SectionHeader
            index="03"
            title="Spacing & layout"
            headingId="heading-design-spacing-layout"
            lead="Work in three layers: fluid gaps that breathe with the viewport, fixed Tailwind steps inside individual components, then named layout tokens whenever you are sizing the page frame or a case-study aside."
            technicalNote={
              <>
                Fluid scales use <TokenBadge>clamp()</TokenBadge> in <TokenBadge>:root</TokenBadge>; density uses <TokenBadge>@theme --spacing-*</TokenBadge> with <TokenBadge>gap-*</TokenBadge> / <TokenBadge>p-*</TokenBadge>; layout aliases cover max widths, gutters, overlays, and breakpoints.
              </>
            }
          />

          <div className="space-y-10">

            {/* Page shell & alignment */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)]">Page alignment</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Center the main column with <TokenBadge>mx-auto</TokenBadge>, cap how wide it can grow with <TokenBadge>--layout-max-width</TokenBadge> (or the smaller / larger variants), and match side gutters with{" "}
                <TokenBadge>--wx-pad-x</TokenBadge>. Inside that frame, prefer flex or grid <TokenBadge>gap-*</TokenBadge> from the theme instead of stacking custom margins. This reference page is intentionally narrow at{" "}
                <TokenBadge>max-w-[900px]</TokenBadge>; most marketing routes use <TokenBadge>max-w-[var(--layout-max-width)]</TokenBadge>.
              </p>
              <div className="rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] p-5 space-y-3">
                <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-relaxed">
                  Drop-in pattern for exploration pages:
                </p>
                <code className="block font-mono text-[11px] text-[var(--wx-ink)] leading-relaxed whitespace-pre-wrap break-all">
                  {`<div class="site-canvas …">\n  <main class="mx-auto max-w-[var(--layout-max-width)] px-[var(--wx-pad-x)]">…</main>\n</div>`}
                </code>
              </div>
            </div>

            {/* Fluid scale */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Fluid scale</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Tokens such as <TokenBadge>--space-fluid-lg</TokenBadge> grow smoothly between breakpoints—ideal for spacing hero sections, large section breaks, and anything where “a little more air on desktop” beats a hard pixel jump.
              </p>
              <div className="space-y-3">
                {FLUID_SPACING.map((s) => (
                  <div key={s.cssVar} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[var(--wx-muted)] w-6 shrink-0">{s.label}</span>
                    <div className="flex-1 h-5 bg-[var(--wx-surface)] rounded relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-[var(--wx-primary)] rounded opacity-60"
                        style={{ width: `${(s.maxPx / 192) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 shrink-0 w-44">
                      <span className="wx-text-meta text-[var(--wx-muted)]">{s.range}</span>
                      <TokenBadge>{s.cssVar}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* @theme spacing scale */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Fixed rhythm (@theme spacing)</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Tailwind&apos;s <TokenBadge>p-*</TokenBadge>, <TokenBadge>m-*</TokenBadge>, and <TokenBadge>gap-*</TokenBadge> pull from hyphenated pairs like <TokenBadge>--spacing-4</TokenBadge>. Use those steps inside buttons, cards, and forms so paddings snap to the same grid everywhere.
              </p>
              <div className="space-y-2">
                {SPACING_THEME_SAMPLES.map((s) => (
                  <div key={s.step} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[var(--wx-muted)] w-7 shrink-0 tabular-nums">{s.step}</span>
                    <div className="flex-1 h-4 bg-[var(--wx-surface)] rounded relative overflow-hidden max-w-[12rem]">
                      <div
                        className="absolute inset-y-0 left-0 bg-[var(--wx-muted)] rounded opacity-50"
                        style={{ width: `${Math.min(100, (s.px / 64) * 100)}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 shrink-0 min-w-[10rem] sm:min-w-[14rem]">
                      <span className="wx-text-meta text-[var(--wx-muted)]">
                        {s.rem} ({s.px}px)
                      </span>
                      <TokenBadge>{`--spacing-${s.step}`}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout tokens */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Layout & region tokens</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Named by job, not by number: gutters, readable column widths, aside width in work layouts, overlay padding on imagery, gallery gutters. Prefer these over inventing parallel max-width variables.
              </p>
              <div className="space-y-0">
                {LAYOUT_TOKENS.map((t) => (
                  <div
                    key={t.cssVar}
                    className="flex items-start justify-between gap-6 py-3.5 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--wx-ink)]">{t.label}</p>
                      <p className="wx-text-body-secondary text-[var(--wx-muted)] mt-1 leading-snug">{t.usage}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <TokenBadge>{t.cssVar}</TokenBadge>
                      <p className="font-mono text-[10px] text-[var(--wx-muted)] block">{t.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakpoints */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Breakpoints</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                These widths back <TokenBadge>sm:</TokenBadge>, <TokenBadge>md:</TokenBadge>, and friends. When you add a new responsive rule, check whether type tokens (e.g. <TokenBadge>--wx-text-*-size-sm</TokenBadge>) or layout <TokenBadge>clamp()</TokenBadge> already solve it before introducing a one-off <TokenBadge>min-width</TokenBadge>.
              </p>
              <div className="divide-y divide-[color:var(--wx-border-faint)] rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden bg-[var(--wx-page-bg)]">
                {BREAKPOINT_TOKENS.map((b) => (
                  <div key={b.cssVar} className="flex items-start gap-4 px-3 py-3">
                    <div className="size-10 shrink-0 rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] ring-1 ring-[color:var(--wx-outline-ink)] flex items-center justify-center">
                      <span className="font-mono text-[10px] font-semibold text-[var(--wx-ink)]">{b.tw}</span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-snug">{b.usage}</p>
                      <p className="font-mono text-[10px] text-[var(--wx-mute-2)]">{b.value}</p>
                    </div>
                    <div className="shrink-0 pt-0.5 text-right">
                      <TokenBadge>{b.cssVar}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 04  Radius ─────────────────────────────────────────────────── */}
        <Divider />
        <section
          id="design-radius"
          className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 scroll-mt-[calc(3.5rem+var(--spacing-4))]"
          aria-labelledby="heading-design-radius"
        >
          <SectionHeader
            index="04"
            title="Radius"
            headingId="heading-design-radius"
            lead="One default card radius keeps photography and cards feeling related; tab chrome steps up to larger radii so pills read as controls sitting inside a track—not as random boxes."
            technicalNote={
              <>
                <TokenBadge>--wx-radius-card</TokenBadge> is the everyday 8px baseline. <TokenBadge>--wx-radius-segment</TokenBadge> / <TokenBadge>--wx-radius-track</TokenBadge> belong to the segmented tab system.
              </>
            }
          />

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {RADIUS_TOKENS.map((r) => (
                <div key={r.cssVar} className="space-y-2.5">
                  <div
                    className="w-full h-14 bg-[var(--wx-surface)] ring-1 ring-[color:var(--wx-border-soft)]"
                    style={{ borderRadius: r.value.includes("rem") || r.value.endsWith("px") ? r.value : undefined }}
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[var(--wx-ink)]">{r.label}</p>
                    <p className="font-mono text-[10px] text-[var(--wx-muted)]">{r.value}</p>
                    <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-tight">{r.usage}</p>
                    <TokenBadge>{r.cssVar}</TokenBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05  Motion ─────────────────────────────────────────────────── */}
        <Divider />
        <section
          id="design-motion"
          className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 scroll-mt-[calc(3.5rem+var(--spacing-4))]"
          aria-labelledby="heading-design-motion"
        >
          <SectionHeader
            index="05"
            title="Motion"
            headingId="heading-design-motion"
            lead="Durations answer “how long should the user feel this change?”; easings answer “does it snap, float, or overshoot?” Prefer named tokens so motion stays consistent and easy to tune."
            technicalNote={
              <>
                When visitors enable reduced motion, durations fall back to 0ms through <TokenBadge>tokens.css</TokenBadge>. Avoid bare <TokenBadge>linear</TokenBadge> easing for interface polish—reach for a curve with character.
              </>
            }
          />

          <div className="space-y-10">
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Duration</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Faster values are for swaps and taps; slower values reinforce hierarchy shifts (menus, staged reveals). Pair each duration with an easing token that matches its intent.
              </p>
              <div className="space-y-3">
                {DURATION_TOKENS.map((d) => (
                  <div key={d.cssVar} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--wx-muted)] w-12 shrink-0 text-right tabular-nums">
                      {d.value}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--wx-surface)]">
                      <div
                        className="h-full rounded-full bg-[var(--wx-primary)] opacity-70"
                        style={{ width: `${d.barPct}%` }}
                      />
                    </div>
                    <div className="min-w-0 w-48 shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <span className="text-sm font-medium text-[var(--wx-ink)]">{d.label}</span>
                      <span className="wx-text-body-secondary text-[var(--wx-muted)] text-left sm:text-right leading-snug">{d.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mt-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Honoring <TokenBadge>prefers-reduced-motion</TokenBadge> here means long transitions gracefully collapse so the interface stays respectful without ripping out styles by hand each time.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Easing curves</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                <TokenBadge>--ease-fluid</TokenBadge> is the default “everyday UI” curve. Springy and exponential options are for entrances, drawers, and moments that should feel choreographed rather than mechanical.
              </p>
              <div className="space-y-0">
                {EASING_TOKENS.map((e) => (
                  <div
                    key={e.cssVar}
                    className="py-4 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="text-sm font-medium text-[var(--wx-ink)]">{e.label}</p>
                      <TokenBadge>{e.cssVar}</TokenBadge>
                    </div>
                    <p className="wx-text-body-secondary text-[var(--wx-muted)] leading-snug">{e.usage}</p>
                    <p className="font-mono text-[10px] text-[var(--wx-muted)] mt-1 opacity-60">{e.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 06  Components ─────────────────────────────────────────────── */}
        <Divider />
        <section
          id="design-components"
          className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 scroll-mt-[calc(3.5rem+var(--spacing-4))]"
          aria-labelledby="heading-design-components"
        >
          <SectionHeader
            index="06"
            title="Components"
            headingId="heading-design-components"
            lead="Reusable excerpts of the exploration UI—project metadata grids, tag rows, and section labels—with live specimens so you can compare intent against implementation."
            technicalNote={
              <>
                Under the hood everything still resolves to <TokenBadge>--wx-*</TokenBadge> aliases so tweaks stay centralized.
              </>
            }
          />

          <div className="space-y-12">

            {/* MetaBlock */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">MetaBlock</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                The label / value grid you see in <TokenBadge>CaseStudyAside</TokenBadge>: uppercase micro labels with generous tracking, paired with medium values for quick scanning.
              </p>
              <div className="p-5 rounded-[8px] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)]">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    { label: "Client",   value: "Avance Financial" },
                    { label: "Year",     value: "2024" },
                    { label: "Role",     value: "Product Design" },
                    { label: "Industry", value: "Fintech · Consumer" },
                  ].map((item) => (
                    <div key={item.label} className="wx-case-aside-meta__item space-y-1">
                      <p
                        style={{
                          fontSize: "var(--wx-text-aside-footer-size, 0.625rem)",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--wx-mute-2)",
                        }}
                      >
                        {item.label}
                      </p>
                      <p className="wx-text-sm font-medium tracking-normal text-[var(--wx-ink)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Tag system */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Tag / pill system</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Tool chips read as compact buttons; the Focus row marquees warm nugget pills (<TokenBadge>--wx-text-nugget-warm</TokenBadge>{" "}
                + <TokenBadge>--wx-border-muted</TokenBadge>) inside a clipped track—no negative margins. Both patterns hang off{" "}
                <TokenBadge>.wx-case-tags</TokenBadge> inside the aside.
              </p>
              <div className="p-5 rounded-[8px] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] space-y-4">
                <div>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "var(--wx-text-aside-footer-size, 0.625rem)",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--wx-mute-2)",
                    }}
                  >
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Framer Motion", "React", "Tailwind CSS", "Lottie"].map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-white)] text-xs font-medium text-[var(--wx-ink)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "var(--wx-text-aside-footer-size, 0.625rem)",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--wx-mute-2)",
                    }}
                  >
                    Focus areas
                  </p>
                  <p
                    className="text-[var(--wx-muted)]"
                    style={{ fontSize: "var(--wx-text-meta-size, 0.8125rem)", lineHeight: "var(--wx-text-meta-leading, 1.5)" }}
                  >
                    {["Motion design", "Design systems", "Prototyping", "User research"].map((t, i, arr) => (
                      <span key={t}>
                        {t}
                        {i < arr.length - 1 && (
                          <span className="mx-1 text-[var(--wx-mute-2)]">·</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Work card nuggets — reference chips (exploration Work tab) */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Work card nuggets</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Case study cards surface a staggered chip row over the artwork (see home Work tab — e.g. Kinetix). Use this pairing of type,
                stroke, fill, and pill radius when you introduce new dense icon + label chips outside the aside—do not reinvent from gray Tailwind
                shorthand.
              </p>
              <div className="p-5 rounded-[8px] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] space-y-4">
                <ul className="m-0 flex max-w-full list-none flex-wrap gap-2 p-0 sm:gap-3" role="list">
                  {[
                    { label: "Case study", icon: "CS" },
                    { label: "Design system", icon: "DS" },
                    { label: "Prototyping", icon: "Px" },
                  ].map(({ label, icon }) => (
                    <li key={label}>
                      <span className="inline-flex min-h-[1.75rem] max-w-full items-center gap-[0.4rem] rounded-full border border-[color:var(--wx-border-muted)] bg-[var(--wx-white)] px-[0.7rem] py-[0.3125rem] text-[length:var(--wx-text-nugget-warm)] font-medium leading-[1.15] tracking-[0.04em] text-[var(--wx-ink)]">
                        <span
                          className="inline-flex size-3 shrink-0 items-center justify-center rounded-[2px] wx-text-meta font-semibold text-[var(--wx-muted)]"
                          aria-hidden
                        >
                          {icon}
                        </span>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="wx-text-meta text-[var(--wx-muted)] leading-relaxed">
                  Implemented as <TokenBadge>WorkNuggetPill</TokenBadge> · <TokenBadge>wx-work-card-v2__nugget</TokenBadge> in{" "}
                  <TokenBadge>ExplorationHomePage.jsx</TokenBadge>
                  {" + "}
                  <TokenBadge>site-canvas.css</TokenBadge>. Main column cards use tighter corners and{" "}
                  <TokenBadge>--wx-text-nugget</TokenBadge>; warm Figma-footprint cards use the full pill shown here.
                </p>
              </div>
            </div>

            {/* Section kicker */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Section kicker</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Tiny uppercase ribbons that anchor a section (“Selected work”) before the big title arrives. Implemented as <TokenBadge>.wx-text-section-kicker</TokenBadge>.
              </p>
              <div className="p-5 rounded-[8px] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] space-y-3">
                <p className="wx-text-section-kicker text-[var(--wx-muted)]">Selected work</p>
                <p className="wx-text-section-kicker text-[var(--wx-muted)]">Approach</p>
                <p className="wx-text-section-kicker text-[var(--wx-muted)]">Design System</p>
              </div>
            </div>

            {/* Component token table */}
            <div>
              <p className="text-sm font-semibold text-[var(--wx-ink)] font-[family-name:var(--font-display)] mb-2">Component-level tokens</p>
              <p className="wx-text-body-secondary text-[var(--wx-muted)] mb-4 leading-relaxed max-w-[min(40rem,var(--layout-max-width-sm))]">
                Specialized sizes and radii that only show up inside a handful of composites—exported here so you do not need to hunt the codebase.
              </p>
              <div className="space-y-0">
                {COMPONENT_TOKENS.map((t) => (
                  <div
                    key={t.cssVar}
                    className="flex items-start justify-between gap-6 py-3.5 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--wx-ink)]">{t.label}</p>
                      <p className="wx-text-body-secondary text-[var(--wx-muted)] mt-1 leading-snug">{t.where}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <TokenBadge>{t.cssVar}</TokenBadge>
                      <p className="font-mono text-[10px] text-[var(--wx-muted)] block">{t.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <Divider />
        <footer className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="wx-text-meta text-[var(--wx-muted)]">
            Tokens in <TokenBadge>src/styles/tokens.css</TokenBadge>{" "}
            · Utilities in <TokenBadge>src/exploration/styles/site-canvas.css</TokenBadge>
          </p>
          <Link
            to="/"
            className="wx-text-meta text-[var(--wx-primary)] hover:underline underline-offset-2 transition-colors duration-[var(--duration-normal)] shrink-0"
          >
            Back to work
          </Link>
        </footer>
      </div>
    </div>
  );
}
