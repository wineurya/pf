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
        token: "--wx-page-bg",
        primitive: "--color-neutral-0",
        bg: "var(--wx-page-bg)",
        usage: "Root page background",
      },
      {
        name: "White",
        token: "--wx-white",
        primitive: "--color-neutral-0",
        bg: "var(--wx-white)",
        usage: "Card surfaces, inputs",
      },
      {
        name: "Surface",
        token: "--wx-surface",
        primitive: "--color-neutral-100",
        bg: "var(--wx-surface)",
        usage: "Chips, filled tabs, subtle wells",
      },
      {
        name: "Surface Soft",
        token: "--wx-surface-soft",
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
        token: "--wx-ink",
        primitive: "--color-neutral-900",
        bg: "var(--wx-ink)",
        usage: "Primary body text, headings",
      },
      {
        name: "Muted",
        token: "--wx-muted",
        primitive: "--color-neutral-600",
        bg: "var(--wx-muted)",
        usage: "Labels, secondary copy, captions",
      },
      {
        name: "Mute 2",
        token: "--wx-mute-2",
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
        token: "--wx-primary",
        bg: "var(--wx-primary)",
        usage: "CTAs, links, active states",
      },
      {
        name: "Teal",
        token: "--wx-accent-teal",
        bg: "var(--wx-accent-teal)",
        usage: "Tool tags, alternate accent",
      },
      {
        name: "Violet",
        token: "--wx-accent-violet",
        bg: "var(--wx-accent-violet)",
        usage: "Gradient, highlight variant",
      },
      {
        name: "Amber",
        token: "--wx-accent-amber",
        bg: "var(--wx-accent-amber)",
        usage: "Warnings, warm highlights",
      },
    ],
  },
];

const BORDER_TOKENS = [
  { name: "Hairline",    token: "--wx-border-hairline", opacity: "4.5%", usage: "Ultra-fine separators" },
  { name: "Faint",       token: "--wx-border-faint",    opacity: "5%",   usage: "Card inner outlines" },
  { name: "Soft",        token: "--wx-border-soft",     opacity: "6%",   usage: "Section dividers, card edges" },
  { name: "Muted",       token: "--wx-border-muted",    opacity: "8%",   usage: "Input rings, hover outlines" },
  { name: "Outline Ink", token: "--wx-outline-ink",     opacity: "12%",  usage: "Button rings, strong outlines" },
];

const FONT_FAMILIES = [
  {
    token: "--font-display",
    label: "Display / titles",
    stack:
      "ui-rounded, SF Pro Rounded, SF Pro Display, SF Pro Text, system-ui…",
    usage: "Hero, section titles, page titles, stats, wordmark — larger / bolder; SF Rounded-led.",
    specimenFontVar: "var(--font-display)",
    mono: false,
  },
  {
    token: "--font-body",
    label: "Body",
    stack: "SF Pro Text, SF Pro Display, system-ui…",
    usage: "Paragraphs, meta, UI chrome, kickers, inputs — SF Pro only (no Rounded).",
    specimenFontVar: "var(--font-body)",
    mono: false,
  },
  {
    token: "--font-mono",
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
    token: "--wx-text-meta-size",
    size: "13px",
    className: "wx-text-meta",
    sample: "Coaching · Consumer mobile — 2024",
    usage: "Captions, back links, fine print, availability",
  },
  {
    label: "Overline",
    token: "--wx-text-overline-size",
    size: "12px",
    className: "wx-text-overline wx-text-section-kicker",
    sample: "SELECTED WORK",
    usage: "Section kickers, form labels — uppercase only",
  },
  {
    label: "Small",
    token: "--wx-text-sm-size",
    size: "14px",
    className: "wx-text-sm",
    sample: "Dense UI body, stat labels, tabs, case steps",
    usage: "Dense body, stat labels, tabs",
  },
  {
    label: "Body Secondary",
    token: "--wx-text-body-secondary-size",
    size: "15 → 16px",
    className: "wx-text-body-secondary",
    sample: "Subheads, card summaries, case ledes, FAQ answers, studio intro.",
    usage: "Primary body text, card summaries",
  },
  {
    label: "Pullquote",
    token: "--wx-text-pullquote-size",
    size: "17 → 20px",
    className: "wx-text-pullquote",
    sample: "Highlighted insight or editorial callout.",
    usage: "Pullquotes, highlighted prose sections",
  },
  {
    label: "Section Title",
    token: "--wx-text-section-title-size",
    size: "24 → 30px",
    className: "wx-text-section-title",
    sample: "Work",
    usage: "Home h2, aside section headers",
  },
  {
    label: "Page Title",
    token: "--wx-text-page-title-size",
    size: "30 → 36px",
    className: "wx-text-page-title",
    sample: "Avance",
    usage: "Case study h1, simple page headers",
  },
];

const LETTER_SPACING = [
  { label: "Tighter",   value: "-0.05em",  tw: "tracking-tighter" },
  { label: "Tight",     value: "-0.025em", tw: "tracking-tight" },
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
  { token: "--space-fluid-xs",  label: "xs",  range: "4 – 8px",    maxPx: 8   },
  { token: "--space-fluid-sm",  label: "sm",  range: "8 – 16px",   maxPx: 16  },
  { token: "--space-fluid-md",  label: "md",  range: "16 – 24px",  maxPx: 24  },
  { token: "--space-fluid-lg",  label: "lg",  range: "24 – 40px",  maxPx: 40  },
  { token: "--space-fluid-xl",  label: "xl",  range: "32 – 64px",  maxPx: 64  },
  { token: "--space-fluid-2xl", label: "2xl", range: "48 – 96px",  maxPx: 96  },
  { token: "--space-fluid-3xl", label: "3xl", range: "64 – 128px", maxPx: 128 },
  { token: "--space-fluid-4xl", label: "4xl", range: "96 – 192px", maxPx: 192 },
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
  { token: "--breakpoint-xs",  value: "23.4375rem (~375px)", tw: "xs",  usage: "Device reference; not always a Tailwind prefix" },
  { token: "--breakpoint-sm",  value: "40rem (640px)",       tw: "sm",  usage: "First conventional jump — type and density" },
  { token: "--breakpoint-md",  value: "48rem (768px)",       tw: "md",  usage: "Tablet split, two-column aside" },
  { token: "--breakpoint-lg",  value: "64rem (1024px)",      tw: "lg",  usage: "Desktop exploration chrome" },
  { token: "--breakpoint-xl",  value: "80rem (1280px)",      tw: "xl",  usage: "Wide layout, max-width alignment" },
  { token: "--breakpoint-2xl", value: "96rem (1536px)",      tw: "2xl", usage: "Extra-wide displays" },
  { token: "--breakpoint-3xl", value: "120rem (1920px)",     tw: "3xl", usage: "Ultra-wide / large canvases" },
];

const LAYOUT_TOKENS = [
  { token: "--wx-pad-x",               value: "clamp(1.25rem, 4vw, 3.75rem)", label: "Page padding X",       usage: "Horizontal inset on exploration / site-canvas shells" },
  { token: "--wx-space-section",       value: "clamp(1.75rem, 4vw, 2.5rem)", label: "Section spacing",       usage: "Vertical gap between stacked aside / section blocks" },
  { token: "--layout-gutter",          value: "clamp(1rem, 4vw, 3rem)",      label: "Layout gutter",        usage: "Global gutter when not using --wx-pad-x" },
  { token: "--layout-max-width",       value: "80rem",                      label: "Max width",            usage: "Primary marketing column cap (1280px)" },
  { token: "--layout-max-width-sm",    value: "40rem",                      label: "Max width (SM)",       usage: "Reading column, narrow forms" },
  { token: "--layout-max-width-lg",    value: "96rem",                      label: "Max width (LG)",       usage: "Wide bands, bento-style shells" },
  { token: "--wx-explore-aside-basis", value: "min(42%, 36rem)",             label: "Aside basis",           usage: "Left rail in work / case split layout" },
  { token: "--wx-max-copy",            value: "31.3125rem",                 label: "Max copy width",        usage: "Overlay text rail before it meets the mock" },
  { token: "--wx-work-overlay-pad-x",  value: "clamp(1rem, 3.5vw, 1.5rem)", label: "Work overlay pad X",    usage: "Card scrim / footer copy horizontal inset" },
  { token: "--wx-work-overlay-pad-y",  value: "clamp(1rem, 3vw, 1.375rem)", label: "Work overlay pad Y",   usage: "Card scrim / footer copy vertical inset" },
  { token: "--wx-work-copy-gap",       value: "0.5rem",                     label: "Work copy stack gap",   usage: "Title ↔ one-liner inside overlays" },
  { token: "--wx-gallery-gap",         value: "12px",                       label: "Gallery gap",           usage: "Gallery grid gutter between frames" },
];

const RADIUS_TOKENS = [
  { token: "--radius-xs",          value: "2px",            label: "XS",          usage: "Fine chip corners" },
  { token: "--radius-sm",          value: "4px",            label: "SM",          usage: "Inputs, subtle cards" },
  { token: "--radius-md",          value: "6px",            label: "MD",          usage: "Buttons, small panels" },
  { token: "--wx-radius-card",     value: "8px",            label: "Card",        usage: "Work cards, case wells" },
  { token: "--wx-radius-segment",  value: "12px",           label: "Segment",     usage: "Active tab pill" },
  { token: "--wx-radius-track",    value: "16px",           label: "Track",       usage: "Tab track container" },
  { token: "--radius-3xl",         value: "24px",           label: "3XL",         usage: "Large decorative shapes" },
  { token: "--radius-pill",        value: "624.9375rem",    label: "Pill",        usage: "Avatar chips, full pill" },
];

const DURATION_TOKENS = [
  { token: "--duration-instant",  value: "0ms",   label: "Instant",  barPct: 0,   usage: "Visibility toggles" },
  { token: "--duration-fast",     value: "100ms", label: "Fast",     barPct: 12,  usage: "Icon swaps, checkboxes" },
  { token: "--duration-normal",   value: "200ms", label: "Normal",   barPct: 25,  usage: "Hover states" },
  { token: "--duration-moderate", value: "300ms", label: "Moderate", barPct: 37,  usage: "Panel slides, menus" },
  { token: "--duration-slow",     value: "400ms", label: "Slow",     barPct: 50,  usage: "Tab transitions" },
  { token: "--duration-slower",   value: "600ms", label: "Slower",   barPct: 75,  usage: "Page-level motion" },
  { token: "--duration-slowest",  value: "800ms", label: "Slowest",  barPct: 100, usage: "Cinematic reveals" },
];

const EASING_TOKENS = [
  { token: "--ease-fluid",          value: "cubic-bezier(0.3, 0, 0, 1)",          label: "Fluid",          usage: "Default UI motion — smooth deceleration" },
  { token: "--ease-snappy",         value: "cubic-bezier(0.2, 0, 0, 1)",          label: "Snappy",         usage: "Tight, immediate UI responses" },
  { token: "--ease-spring",         value: "cubic-bezier(0.34, 1.56, 0.64, 1)",   label: "Spring",         usage: "Menus, drawers, popovers — slight overshoot" },
  { token: "--ease-bounce",         value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)", label: "Bounce",      usage: "Playful entries, badge pop-ins" },
  { token: "--ease-expo-out",       value: "cubic-bezier(0.19, 1, 0.22, 1)",      label: "Expo Out",       usage: "Hero reveals, page transitions" },
  { token: "--ease-back-out",       value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", label: "Back Out",   usage: "Scale-up reveals with pull-back" },
  { token: "--ease-ui-strong-out",  value: "cubic-bezier(0.23, 1, 0.32, 1)",      label: "UI Strong Out",  usage: "Full-screen layout morphs, crossfades" },
  { token: "--ease-morph-in-out",   value: "cubic-bezier(0.77, 0, 0.175, 1)",     label: "Morph In/Out",   usage: "Drawer-like moves, content swaps" },
];

const COMPONENT_TOKENS = [
  { token: "--wx-radius-card",     value: "8px",            label: "Card radius",        where: "Work cards, MetaBlock wells" },
  { token: "--wx-radius-segment",  value: "12px",           label: "Segment radius",     where: "Active tab in SectionTabRail" },
  { token: "--wx-radius-track",    value: "16px",           label: "Track radius",       where: "Tab container in SectionTabRail" },
  { token: "--wx-tab-pill-height", value: "2.375rem / 38px",label: "Tab height",         where: "SectionTabRail" },
  { token: "--wx-gallery-gap",     value: "12px",           label: "Gallery gap",        where: "Work card grid gutter" },
  { token: "--wx-text-aside-footer-size", value: "0.625rem / 10px", label: "Aside label size", where: "MetaBlock label, tag group headers" },
  { token: "--wx-text-kicker-tracking",   value: "0.18em",          label: "Kicker tracking",  where: "Section kickers, overline elements" },
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
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <p className="text-xs font-semibold text-[var(--wx-ink)]">{title}</p>
      {description ? (
        <p className="wx-text-meta text-[var(--wx-muted)] sm:max-w-[22rem] sm:text-right">{description}</p>
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
function ColorTokenRow({ label, token, primitive, usage, bg, oklchL }) {
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
        <p className="wx-text-meta text-[var(--wx-muted)] leading-snug">{usage}</p>
        {primitive ? (
          <p className="wx-text-meta text-[var(--wx-muted)]">
            Resolves to <TokenBadge>{primitive}</TokenBadge>
          </p>
        ) : null}
      </div>
      <div className="shrink-0 pt-0.5 text-right">
        <TokenBadge>{token}</TokenBadge>
      </div>
    </div>
  );
}

function SectionHeader({ index, title, description }) {
  return (
    <div className="col-span-full lg:col-span-1 lg:sticky lg:top-[57px] lg:self-start">
      <p className="font-mono text-[11px] text-[var(--wx-muted)] tracking-widest mb-2">{index}</p>
      <h2 className="text-xl font-semibold tracking-tight text-[var(--wx-ink)] leading-tight">{title}</h2>
      {description && (
        <p className="wx-text-meta text-[var(--wx-muted)] mt-2 leading-relaxed max-w-[18rem]">{description}</p>
      )}
    </div>
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

      <main id="main" className="mx-auto max-w-[900px] px-[var(--wx-pad-x)] pb-32">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="pt-16 pb-14 lg:pt-20 lg:pb-16">
          <p className="wx-text-section-kicker text-[var(--wx-muted)] mb-5">Design System</p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--wx-ink)] sm:text-4xl leading-tight max-w-2xl mb-5">
            The visual vocabulary.
          </h1>
          <p className="wx-text-body-secondary text-[var(--wx-muted)] max-w-lg">
            Color, type, spacing, layout, radius, and motion tokens that power every surface of wineury.design — all defined in{" "}
            <TokenBadge>tokens.css</TokenBadge> and composed as utilities in{" "}
            <TokenBadge>site-canvas.css</TokenBadge>.
          </p>
        </section>

        {/* ── 01  Color ──────────────────────────────────────────────────── */}
        <Divider />
        <section className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          <SectionHeader
            index="01"
            title="Color"
            description="Primitive neutrals live in @theme; marketing semantics use --wx-* aliases that resolve to --color-neutral-* or canonical accent hex (tokens.css)."
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
                <p className="wx-text-meta text-[var(--wx-muted)] leading-snug">
                  Strip: smooth reference (OKLCH lightness only). Table: named stops — spacing tightens at the paper end by design.
                </p>
              </div>
              <div className="divide-y divide-[color:var(--wx-border-faint)] rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden bg-[var(--wx-page-bg)]">
                {NEUTRAL_SCALE.map(({ step, oklchL, usage }) => (
                  <ColorTokenRow
                    key={step}
                    label={`Neutral ${step}`}
                    token={`--color-neutral-${step}`}
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
                      key={item.token}
                      label={item.name}
                      token={item.token}
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
                  <div key={b.token} className="flex items-start gap-4 px-3 py-3">
                    <div
                      className="size-10 shrink-0 rounded-[var(--wx-radius-card)] bg-[var(--wx-page-bg)]"
                      style={{ border: `2px solid var(${b.token})` }}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs font-medium text-[var(--wx-ink)]">{b.name}</p>
                      <p className="wx-text-meta text-[var(--wx-muted)] leading-snug">{b.usage}</p>
                      <p className="wx-text-meta text-[var(--wx-muted)]">
                        Mix <span className="font-mono tabular-nums">{b.opacity}</span> black
                      </p>
                    </div>
                    <div className="shrink-0 pt-0.5 text-right">
                      <TokenBadge>{b.token}</TokenBadge>
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
                  <p className="wx-text-meta text-[var(--wx-muted)] leading-snug">
                    <TokenBadge>--wx-gradient-accent</TokenBadge> · also drives{" "}
                    <TokenBadge>--wx-headline-word-gradient</TokenBadge>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02  Typography ─────────────────────────────────────────────── */}
        <Divider />
        <section className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          <SectionHeader
            index="02"
            title="Typography"
            description={
              <>
                Two stacks in <TokenBadge>tokens.css</TokenBadge>:{" "}
                <TokenBadge>--font-display</TokenBadge> for bigger / bolder surfaces (hero, titles, stats, wordmark)
                — SF Pro Rounded–led via <TokenBadge>ui-rounded</TokenBadge>.{" "}
                <TokenBadge>--font-body</TokenBadge> for reading and dense UI — SF Pro Text / SF Pro Display only.
                .wx-text-* utilities bind to the correct stack in <TokenBadge>site-canvas.css</TokenBadge>.
              </>
            }
          />

          <div className="space-y-10">

            {/* Font families */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-3">Font families</p>
              <div className="space-y-0">
                {FONT_FAMILIES.map((fam) => (
                  <div
                    key={fam.token}
                    className="flex items-start justify-between gap-6 py-4 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xl tracking-tight text-[var(--wx-ink)] ${fam.mono ? "font-mono" : "font-medium"}`}
                        style={fam.specimenFontVar ? { fontFamily: fam.specimenFontVar } : undefined}
                      >
                        {fam.mono ? "0123456789 Aa Bb Cc" : "Aa Bb Cc Dd Ee 0123"}
                      </p>
                      <p className="wx-text-meta text-[var(--wx-muted)] mt-1">{fam.usage}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1 pt-0.5">
                      <p className="text-xs font-semibold text-[var(--wx-ink)]">{fam.label}</p>
                      <TokenBadge>{fam.token}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Type scale */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Type scale</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Classes bind <TokenBadge>font-family</TokenBadge>, <TokenBadge>font-size</TokenBadge>, and <TokenBadge>line-height</TokenBadge>. Apply weight separately.
              </p>
              <div className="space-y-0">
                {TYPE_SCALE.map((step) => (
                  <div
                    key={step.token}
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
                      <p className="wx-text-meta text-[var(--wx-muted)]">{step.usage}</p>
                      <TokenBadge>{step.token}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Letter spacing + line height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-semibold text-[var(--wx-ink)] mb-4">Letter spacing</p>
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
                <p className="text-xs font-semibold text-[var(--wx-ink)] mb-4">Line height</p>
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
        <section className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          <SectionHeader
            index="03"
            title="Spacing & layout"
            description="Fluid tokens for viewport-aware gaps, @theme spacing for component rhythm, and layout aliases for gutters, alignment, breakpoints, and work-card chrome."
          />

          <div className="space-y-10">

            {/* Page shell & alignment */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-[var(--wx-ink)]">Page alignment</p>
              <p className="wx-text-meta text-[var(--wx-muted)] leading-relaxed">
                Center the readable column with <TokenBadge>mx-auto</TokenBadge>, cap width with{" "}
                <TokenBadge>--layout-max-width</TokenBadge> (or SM/LG variants), and inset horizontally with{" "}
                <TokenBadge>--wx-pad-x</TokenBadge>. Prefer flex/grid <TokenBadge>gap-*</TokenBadge> from the theme scale instead of stacking one-off margins. This checklist page intentionally uses{" "}
                <TokenBadge>max-w-[900px]</TokenBadge>; marketing routes typically use{" "}
                <TokenBadge>max-w-[var(--layout-max-width)]</TokenBadge>.
              </p>
              <div className="rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] p-5 space-y-3">
                <p className="wx-text-meta text-[var(--wx-muted)]">
                  Canonical exploration shell fragment:
                </p>
                <code className="block font-mono text-[11px] text-[var(--wx-ink)] leading-relaxed whitespace-pre-wrap break-all">
                  {`<div class="site-canvas …">\n  <main class="mx-auto max-w-[var(--layout-max-width)] px-[var(--wx-pad-x)]">…</main>\n</div>`}
                </code>
              </div>
            </div>

            {/* Fluid scale */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Fluid scale</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                <TokenBadge>:root</TokenBadge> <TokenBadge>clamp()</TokenBadge> — use between major bands (hero, section breaks).
              </p>
              <div className="space-y-3">
                {FLUID_SPACING.map((s) => (
                  <div key={s.token} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[var(--wx-muted)] w-6 shrink-0">{s.label}</span>
                    <div className="flex-1 h-5 bg-[var(--wx-surface)] rounded relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-[var(--wx-primary)] rounded opacity-60"
                        style={{ width: `${(s.maxPx / 192) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 shrink-0 w-44">
                      <span className="wx-text-meta text-[var(--wx-muted)]">{s.range}</span>
                      <TokenBadge>{s.token}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* @theme spacing scale */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Fixed rhythm (@theme spacing)</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Tailwind <TokenBadge>p-*</TokenBadge>, <TokenBadge>m-*</TokenBadge>, <TokenBadge>gap-*</TokenBadge> map to hyphenated tokens such as{" "}
                <TokenBadge>--spacing-4</TokenBadge>. Prefer these over arbitrary pixels inside components.
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
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Layout & region tokens</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Named by role — gutters, max widths, aside basis, overlays, gallery rhythm.
              </p>
              <div className="space-y-0">
                {LAYOUT_TOKENS.map((t) => (
                  <div
                    key={t.token}
                    className="flex items-start justify-between gap-6 py-3.5 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--wx-ink)]">{t.label}</p>
                      <p className="wx-text-meta text-[var(--wx-muted)] mt-0.5">{t.usage}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <TokenBadge>{t.token}</TokenBadge>
                      <p className="font-mono text-[10px] text-[var(--wx-muted)] block">{t.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakpoints */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Breakpoints</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Defined in <TokenBadge>@theme</TokenBadge>; drive responsive prefixes. Pair with responsive type tokens (e.g.{" "}
                <TokenBadge>--wx-text-*-size-sm</TokenBadge>) and <TokenBadge>clamp()</TokenBadge> layout before adding bespoke min-widths.
              </p>
              <div className="divide-y divide-[color:var(--wx-border-faint)] rounded-[var(--wx-radius-card)] ring-1 ring-[color:var(--wx-border-soft)] overflow-hidden bg-[var(--wx-page-bg)]">
                {BREAKPOINT_TOKENS.map((b) => (
                  <div key={b.token} className="flex items-start gap-4 px-3 py-3">
                    <div className="size-10 shrink-0 rounded-[var(--wx-radius-card)] bg-[var(--wx-surface)] ring-1 ring-[color:var(--wx-outline-ink)] flex items-center justify-center">
                      <span className="font-mono text-[10px] font-semibold text-[var(--wx-ink)]">{b.tw}</span>
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="wx-text-meta text-[var(--wx-muted)] leading-snug">{b.usage}</p>
                      <p className="font-mono text-[10px] text-[var(--wx-mute-2)]">{b.value}</p>
                    </div>
                    <div className="shrink-0 pt-0.5 text-right">
                      <TokenBadge>{b.token}</TokenBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 04  Radius ─────────────────────────────────────────────────── */}
        <Divider />
        <section className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          <SectionHeader
            index="04"
            title="Radius"
            description="8px (Card) is the base. UI chrome uses Segment (12px) and Track (16px) for the tab pill system."
          />

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {RADIUS_TOKENS.map((r) => (
                <div key={r.token} className="space-y-2.5">
                  <div
                    className="w-full h-14 bg-[var(--wx-surface)] ring-1 ring-[color:var(--wx-border-soft)]"
                    style={{ borderRadius: r.value.includes("rem") || r.value.endsWith("px") ? r.value : undefined }}
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[var(--wx-ink)]">{r.label}</p>
                    <p className="font-mono text-[10px] text-[var(--wx-muted)]">{r.value}</p>
                    <p className="wx-text-meta text-[var(--wx-muted)] leading-tight">{r.usage}</p>
                    <TokenBadge>{r.token}</TokenBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05  Motion ─────────────────────────────────────────────────── */}
        <Divider />
        <section className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          <SectionHeader
            index="05"
            title="Motion"
            description="All durations resolve to 0ms under prefers-reduced-motion. No linear easing in UI — every transition follows an intentional physics curve."
          />

          <div className="space-y-10">
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-4">Duration</p>
              <div className="space-y-3">
                {DURATION_TOKENS.map((d) => (
                  <div key={d.token} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--wx-muted)] w-12 shrink-0 text-right tabular-nums">
                      {d.value}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--wx-surface)]">
                      <div
                        className="h-full rounded-full bg-[var(--wx-primary)] opacity-70"
                        style={{ width: `${d.barPct}%` }}
                      />
                    </div>
                    <div className="w-48 shrink-0 flex items-center justify-between gap-2">
                      <span className="text-xs text-[var(--wx-ink)]">{d.label}</span>
                      <span className="wx-text-meta text-[var(--wx-muted)] text-right">{d.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="wx-text-meta text-[var(--wx-muted)] mt-4">
                All zeroed by <TokenBadge>prefers-reduced-motion: reduce</TokenBadge> via tokens.css.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Easing curves</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Use <TokenBadge>--ease-fluid</TokenBadge> as the default. Reach for spring or expo variants for entrance motion.
              </p>
              <div className="space-y-0">
                {EASING_TOKENS.map((e) => (
                  <div
                    key={e.token}
                    className="py-4 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <p className="text-sm font-medium text-[var(--wx-ink)]">{e.label}</p>
                      <TokenBadge>{e.token}</TokenBadge>
                    </div>
                    <p className="wx-text-meta text-[var(--wx-muted)]">{e.usage}</p>
                    <p className="font-mono text-[10px] text-[var(--wx-muted)] mt-1 opacity-60">{e.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 06  Components ─────────────────────────────────────────────── */}
        <Divider />
        <section className="py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
          <SectionHeader
            index="06"
            title="Components"
            description="UI primitives shared across case studies, home canvas, and navigation chrome. Every value routes through --wx-* tokens."
          />

          <div className="space-y-12">

            {/* MetaBlock */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">MetaBlock</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Used in <TokenBadge>CaseStudyAside</TokenBadge> to display project metadata. 2-column{" "}
                <TokenBadge>dl</TokenBadge> grid — 10px uppercase label + 14px medium value.
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
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Tag / pill system</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                Used in <TokenBadge>CaseStudyAside</TokenBadge> via <TokenBadge>.wx-case-tags</TokenBadge>.
                Tool row: icon marks + labels. Focus row: soft-filled capsule pills (<TokenBadge>py-1</TokenBadge>{" "}
                × <TokenBadge>px-2.5</TokenBadge>), marquee strip with faded horizontal edges at{" "}
                <TokenBadge>--wx-text-meta-size</TokenBadge> (13px).
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

            {/* Section kicker */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-1">Section kicker</p>
              <p className="wx-text-meta text-[var(--wx-muted)] mb-4">
                <TokenBadge>.wx-text-section-kicker</TokenBadge> — 12px, 600 weight, 0.18em tracking, uppercase.
                Used on home section headers and aside labels.
              </p>
              <div className="p-5 rounded-[8px] ring-1 ring-[color:var(--wx-border-soft)] bg-[var(--wx-surface-soft)] space-y-3">
                <p className="wx-text-section-kicker text-[var(--wx-muted)]">Selected work</p>
                <p className="wx-text-section-kicker text-[var(--wx-muted)]">Approach</p>
                <p className="wx-text-section-kicker text-[var(--wx-muted)]">Design System</p>
              </div>
            </div>

            {/* Component token table */}
            <div>
              <p className="text-xs font-semibold text-[var(--wx-ink)] mb-3">Component-level tokens</p>
              <div className="space-y-0">
                {COMPONENT_TOKENS.map((t) => (
                  <div
                    key={t.token}
                    className="flex items-start justify-between gap-6 py-3.5 border-b border-[color:var(--wx-border-faint)] last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--wx-ink)]">{t.label}</p>
                      <p className="wx-text-meta text-[var(--wx-muted)] mt-0.5">{t.where}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <TokenBadge>{t.token}</TokenBadge>
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
      </main>
    </div>
  );
}
