/** One-page sections: right column scroll drives tab state. */
export const WINNIE_SECTION_IDS = [
  "winnie-section-work",
  "winnie-section-studio",
  "winnie-section-approach",
  "winnie-section-contact",
];

export const WINNIE_TABS = [
  { id: "work", label: "Work", sectionId: "winnie-section-work" },
  { id: "studio", label: "Studio", sectionId: "winnie-section-studio" },
  { id: "approach", label: "Approach", sectionId: "winnie-section-approach" },
  { id: "contact", label: "Contact", sectionId: "winnie-section-contact" },
];

/**
 * Exported from Figma MCP (node 146:15377). URLs expire ~7 days — then re-run MCP or rely on fallbacks.
 * @see https://www.figma.com/design/Qr0YJLIekI7fli6N6nKgzB/Design-Exploration?node-id=146-15377
 */
export const WINNIE_FIGMA_ASSETS = {
  heroMountain: "https://www.figma.com/api/mcp/asset/df18d447-515f-49a2-a1ea-e0a3cdae9b41",
  heroOcean: "https://www.figma.com/api/mcp/asset/3c8a4aa9-c288-4b68-bd5d-8bffdce84853",
  logoMark: "https://www.figma.com/api/mcp/asset/accd9e41-07a9-4070-9036-07b6743e67a5",
  statusDot: "https://www.figma.com/api/mcp/asset/7ffad080-da58-444b-aa73-1a9edcddd2b5",
  /** Headline sparkle — re-export from Figma if MCP URL expires */
  headlineSparkle: "https://www.figma.com/api/mcp/asset/abd085fc-42a7-4771-9064-a14f55e15d8c",
};

/** Same frames as Figma file (Unsplash sources) — used if Figma MCP URLs fail. */
export const WINNIE_IMAGE_FALLBACKS = {
  heroMountain: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85",
  heroOcean: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=2000&q=85",
};

/** Supporting sections (not in base wireframe stills). */
export const WINNIE_EXTRA_IMAGES = {
  marble: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
  gradient: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=85",
  aurora: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=85",
  studioDesk: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85",
  typography: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?auto=format&fit=crop&w=1600&q=85",
  workshop: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1600&q=85",
};

/**
 * Work grid — image-first; copy + tech nuggets live in hover/focus overlays (center only).
 */
export const WINNIE_WORK = [
  {
    slug: "north-ridge",
    title: "North Ridge",
    kind: "Brand · Website",
    year: "2026",
    summary: "Positioning and identity for a climbing guides collective — calm, earned, unsentimental.",
    image: { primary: "heroMountain", fallback: "heroMountain" },
    alt: "Misty layered landscape",
    featured: true,
    overlayTitle: "North Ridge",
    overlaySubtitle: "Brand system · marketing site",
    nuggets: [
      { label: "React", color: "#61dafb", icon: "CodeCircleIcon" },
      { label: "Design system", color: "#a855f7", icon: "GridViewIcon" },
      { label: "Motion", color: "#f97316", icon: "FramerIcon" },
    ],
  },
  {
    slug: "okeanos",
    title: "Okeanos",
    kind: "Website · Motion",
    year: "2025",
    summary: "Immersive booking experience for a sustainable dive school — water cadence, zero chrome.",
    image: { primary: "heroOcean", fallback: "heroOcean" },
    alt: "Turquoise water and sea foam",
    featured: true,
    overlayTitle: "Okeanos",
    overlaySubtitle: "Booking · editorial film",
    nuggets: [
      { label: "Lenis", color: "#22d3ee", icon: "Layout01Icon" },
      { label: "WCAG 2.2", color: "#4ade80", icon: "Layers01Icon" },
      { label: "CMS", color: "#818cf8", icon: "ComputerDesk01Icon" },
    ],
  },
  {
    slug: "atelier-marée",
    title: "Atelier Marée",
    kind: "Identity · Art direction",
    year: "2025",
    summary: "Perfumery reimagined as an editorial journal — a system of restrained type and object.",
    image: null,
    alt: "Atelier Marée project placeholder",
    overlayTitle: "Atelier Marée",
    overlaySubtitle: "Identity · lookbook",
    nuggets: [
      { label: "Figma", color: "#a259ff", icon: "FigmaIcon" },
      { label: "Type", color: "#f472b6", icon: "PenTool01Icon" },
      { label: "Print", color: "#94a3b8", icon: "LayoutTwoColumnIcon" },
    ],
  },
  {
    slug: "studio-nord",
    title: "Studio Nord",
    kind: "Website · CMS",
    year: "2024",
    summary: "Architecture practice site with a careful, photo-first rhythm and precise type pairings.",
    image: null,
    alt: "Studio Nord project placeholder",
    overlayTitle: "Studio Nord",
    overlaySubtitle: "Architecture · case studies",
    nuggets: [
      { label: "Next.js", color: "#7dd3fc", icon: "CodeCircleIcon" },
      { label: "Sanity", color: "#f43f5e", icon: "GridTableIcon" },
      { label: "Maps API", color: "#4ade80", icon: "LayoutThreeColumnIcon" },
    ],
  },
  {
    slug: "quiet-labs",
    title: "Quiet Labs",
    kind: "Product · Web",
    year: "2024",
    summary: "Interface system for a research studio — soft density, strong defaults, no noise.",
    image: null,
    alt: "Quiet Labs project placeholder",
    overlayTitle: "Quiet Labs",
    overlaySubtitle: "Product UI · research tools",
    nuggets: [
      { label: "React", color: "#61dafb", icon: "CodeCircleIcon" },
      { label: "Design tokens", color: "#c084fc", icon: "MagicWand01Icon" },
      { label: "A11y", color: "#2dd4bf", icon: "FallingStarIcon" },
    ],
  },
];

/**
 * Aside stack — two marquee lanes (design vs build/AI). Simple Icons CDN SVGs include
 * fill; Adobe is local; VS Code uses Wikimedia Commons. brandHex tints the chip.
 */
export const WINNIE_STACK_MARQUEE_LAYERS = [
  [
    {
      label: "Figma",
      href: "https://www.figma.com/",
      brandSlug: "figma",
      brandHex: "#f24e1e",
    },
    {
      label: "Adobe CC",
      href: "https://www.adobe.com/creativecloud.html",
      brandSlug: "adobe",
      logoUrl: "/stack-logos/adobe.svg",
      brandHex: "#ed2224",
    },
    {
      label: "Framer",
      href: "https://www.framer.com/",
      brandSlug: "framer",
      brandHex: "#0055ff",
    },
    {
      label: "Rive",
      href: "https://rive.app/",
      brandSlug: "rive",
      brandHex: "#ff4d4d",
    },
    {
      label: "Blender",
      href: "https://www.blender.org/",
      brandSlug: "blender",
      brandHex: "#e87d0d",
    },
    {
      label: "Storybook",
      href: "https://storybook.js.org/",
      brandSlug: "storybook",
      brandHex: "#ff4785",
    },
  ],
  [
    {
      label: "VS Code",
      href: "https://code.visualstudio.com/",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
      brandHex: "#007acc",
    },
    {
      label: "GitHub",
      href: "https://github.com/",
      brandSlug: "github",
      brandHex: "#181717",
    },
    {
      label: "React",
      href: "https://react.dev/",
      brandSlug: "react",
      brandHex: "#61dafb",
    },
    {
      label: "TypeScript",
      href: "https://www.typescriptlang.org/",
      brandSlug: "typescript",
      brandHex: "#3178c6",
    },
    {
      label: "Next.js",
      href: "https://nextjs.org/",
      brandSlug: "nextdotjs",
      brandHex: "#000000",
    },
    {
      label: "Tailwind CSS",
      href: "https://tailwindcss.com/",
      brandSlug: "tailwindcss",
      brandHex: "#06b6d4",
    },
    {
      label: "Vite",
      href: "https://vite.dev/",
      brandSlug: "vite",
      brandHex: "#646cff",
    },
    {
      label: "PostgreSQL",
      href: "https://www.postgresql.org/",
      brandSlug: "postgresql",
      brandHex: "#4169e1",
    },
    {
      label: "Supabase",
      href: "https://supabase.com/",
      brandSlug: "supabase",
      brandHex: "#3ecf8e",
    },
    {
      label: "Firebase",
      href: "https://firebase.google.com/",
      brandSlug: "firebase",
      brandHex: "#ffca28",
    },
    {
      label: "Claude",
      href: "https://www.anthropic.com/",
      brandSlug: "anthropic",
      brandHex: "#d97757",
    },
    {
      label: "ChatGPT",
      href: "https://chatgpt.com/",
      brandSlug: "openai",
      brandHex: "#412991",
    },
  ],
];

/** Flat list for search / reuse; marquees use {@link WINNIE_STACK_MARQUEE_LAYERS}. */
export const WINNIE_STACK_TOOLS = WINNIE_STACK_MARQUEE_LAYERS.flat();

/**
 * Contact row — `icon` keys map to Phosphor icons (monochrome stroke, B/W via currentColor).
 */
export const WINNIE_CONTACT_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "X (Twitter)", href: "https://twitter.com/", icon: "x" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "Email", href: "mailto:hello@winnie.studio", icon: "email" },
];

/** Clients marquee (wordmarks, not logos — keeps typographic consistency). */
export const WINNIE_CLIENTS = [
  "Atelier Marée",
  "North Ridge",
  "Okeanos",
  "Studio Nord",
  "Quiet Labs",
  "Hana + Co.",
  "Forme Studio",
  "Brightwater",
];

/** Studio capabilities — short verbs, then sub-line. `accent` tints icon well + title. */
export const WINNIE_CAPABILITIES = [
  {
    iconKey: "PenTool01Icon",
    title: "Identity",
    body: "Positioning, verbal identity, wordmarks, type systems.",
    accent: "#9333ea",
  },
  {
    iconKey: "MagicWand01Icon",
    title: "Interface",
    body: "Systems that scale from landing to product without shouting.",
    accent: "#0d9488",
  },
  {
    iconKey: "CodeCircleIcon",
    title: "Engineering",
    body: "React, Next, Motion, Lenis — shipped with care and accessibility.",
    accent: "#2563eb",
  },
  {
    iconKey: "FallingStarIcon",
    title: "Motion",
    body: "Restrained transitions that feel like part of the craft, not paint on top.",
    accent: "#ea580c",
  },
];

/** Featured testimonial pulled from a notional client note — replace with real quotes. */
export const WINNIE_TESTIMONIAL = {
  quote:
    "Winnie rewrote our story with more care than we wrote it ourselves. The site feels like the studio we've been trying to describe for years.",
  attribution: "Mara Lindqvist",
  role: "Creative Director, Studio Nord",
};

/** Stats row — calm, factual. */
export const WINNIE_STATS = [
  { value: "12+", label: "Launches shipped", hint: "Marketing sites, product, brand." },
  { value: "6 wk", label: "Median engagement", hint: "From kickoff to public launch." },
  { value: "99", label: "Lighthouse median", hint: "Performance, a11y, SEO." },
];

/** FAQ — concise, agency-grade. */
export const WINNIE_FAQ = [
  {
    q: "How do you scope a project?",
    a: "A short paid discovery to define the promise, audience, and success metric. Then a fixed-fee build with clear milestones and a single point of contact.",
  },
  {
    q: "Do you work with in-house teams?",
    a: "Often. I partner with founders, creative directors, and engineering leads — and hand off a system your team can own without me.",
  },
  {
    q: "What's the typical timeline?",
    a: "Four to eight weeks for a focused marketing site. Product and brand systems usually run eight to sixteen weeks depending on scope.",
  },
  {
    q: "Can you code the design yourself?",
    a: "Yes. Design and engineering are the same conversation here — no throw-over-the-wall handoffs.",
  },
];

/** Availability — lightweight calendar cue. */
export const WINNIE_AVAILABILITY = {
  note: "Taking 2 new engagements this quarter.",
  opening: "Next opening: July 2026",
};
