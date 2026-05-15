/**
 * Design System — single source of truth for the Rebuild section.
 *
 * The gray ramp matches the dark-theme spec (8 stops + pure white). Hex values
 * are literal so the system page reads exactly like the source plate.
 *
 * Light-theme equivalents stay in `tokens.css` under the `:root` block; this
 * file is the documentation pass for designers and reviewers.
 */

export const GRAYS = [
  { id: "white",       name: "Pure White",   role: "Primary Text · Headline",                hex: "#FFFFFF" },
  { id: "gray-d-10",   name: "Gray Dark 10", role: "Secondary Text · Subheadline",           hex: "#7B7B7B" },
  { id: "gray-d-6",    name: "Gray Dark 6",  role: "Border (0.5px stroke)",                  hex: "#3A3A3A" },
  { id: "gray-d-5",    name: "Gray Dark 5",  role: "Foreground (stack on top of Gray 4)",    hex: "#313131" },
  { id: "gray-d-4",    name: "Gray Dark 4",  role: "Foreground / Background (on Gray 3)",    hex: "#2A2A2A" },
  { id: "gray-d-3",    name: "Gray Dark 3",  role: "Foreground (on top of Gray 2 / 1)",      hex: "#222222" },
  { id: "gray-d-2",    name: "Gray Dark 2",  role: "Foreground · Hover State",               hex: "#191919" },
  { id: "gray-d-1",    name: "Gray Dark 1",  role: "Background",                             hex: "#111111" },
];

export const ACCENTS = [
  { id: "work",    name: "Work",    role: "Brand blue — work tile actions",   hex: "#2563EB" },
  { id: "studio",  name: "Studio",  role: "Coral pink — studio kicker + tab", hex: "#FB7185" },
  { id: "process", name: "Process", role: "Teal — process kicker + tab",      hex: "#2DD4BF" },
  { id: "faq",     name: "FAQ",     role: "Green — FAQ kicker chip",          hex: "#4ADE80" },
  { id: "contact", name: "Contact", role: "Amber — contact kicker + tab",     hex: "#FB923C" },
];

export const TYPE_SCALE = [
  { id: "display-lg", label: "Display L", size: "44–56px", line: "1.04", weight: "Emphasis · 590", role: "Section heroes" },
  { id: "display-md", label: "Display M", size: "32px",    line: "1.10", weight: "Emphasis · 590", role: "Section headings" },
  { id: "title",      label: "Title",     size: "20–24px", line: "1.22", weight: "Emphasis · 590", role: "Card titles, callouts" },
  { id: "body-lg",    label: "Body L",    size: "16px",    line: "1.50", weight: "Regular · 400",  role: "Hero body, long form" },
  { id: "body",       label: "Body",      size: "14px",    line: "1.43", weight: "Regular · 400",  role: "Card body, descriptions" },
  { id: "meta",       label: "Meta",      size: "12px",    line: "1.33", weight: "Supporting · 510", role: "Tags, timestamps, captions" },
  { id: "kicker",     label: "Kicker",    size: "14px",    line: "1.43", weight: "Emphasis · 590", role: "Section pills (mono, caps)" },
];

export const SPACING = [
  { id: "s-1",  token: "spacing-1",  px: "4px",   role: "Hairline gaps · icon padding" },
  { id: "s-2",  token: "spacing-2",  px: "8px",   role: "Tight in-row gaps" },
  { id: "s-3",  token: "spacing-3",  px: "12px",  role: "Title row gaps" },
  { id: "s-4",  token: "spacing-4",  px: "16px",  role: "Card inner padding, tab gaps" },
  { id: "s-6",  token: "spacing-6",  px: "24px",  role: "Card outer padding" },
  { id: "s-8",  token: "spacing-8",  px: "32px",  role: "Section vertical rhythm" },
  { id: "s-10", token: "spacing-10", px: "40px",  role: "Between section groups" },
  { id: "s-16", token: "spacing-16", px: "64px",  role: "Page block separation" },
];

export const RADII = [
  { id: "r-md",   token: "radius-md",   px: "6px",   role: "Buttons, small chips" },
  { id: "r-lg",   token: "radius-lg",   px: "8px",   role: "Nav tabs, inputs" },
  { id: "r-xl",   token: "radius-xl",   px: "12px",  role: "Cards (default)" },
  { id: "r-2xl",  token: "radius-2xl",  px: "16px",  role: "Top-rounded process cards" },
  { id: "r-pill", token: "radius-pill", px: "999px", role: "Section kickers, ghost CTAs" },
];

export const PRINCIPLES = [
  {
    id: "minimal-outlines",
    title: "Outlines, sparingly",
    body: "Hairlines (0.5px / Gray Dark 6) are reserved for structural divisions. Fill differences and shadows do most of the lifting. If a border can be a value step, prefer the value step.",
  },
  {
    id: "value-stacks",
    title: "Stack values, not lines",
    body: "Surfaces stack by stepping one tone up or down the gray ramp. Foreground-on-foreground reads as depth — no borders required.",
  },
  {
    id: "quiet-color",
    title: "Color is a wayfinder",
    body: "Accents only land on section kickers and one or two destinations per tile. Everything else stays on the gray ramp so the work stays visible.",
  },
  {
    id: "measured-motion",
    title: "Measured motion",
    body: "Easing follows --ease-fluid; durations sit at 200–420ms. Reduced-motion users see static layouts with the same information density.",
  },
];
