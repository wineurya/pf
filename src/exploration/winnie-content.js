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
 * Order: flagship first. Logitech marked incomplete until route + screenshots are ready.
 */
export const WINNIE_WORK = [
  {
    slug: "incity",
    title: "InCity",
    kind: "Civic UX · Mobile",
    year: "2025",
    summary:
      "Redesigned ATL311 into a mobile-first civic reporting flow — fewer steps, live case tracking, and clearer confirmation for Atlanta residents.",
    image: { primary: "heroMountain", fallback: "heroMountain" },
    alt: "Misty layered mountain landscape representing a calm, clear civic experience",
    featured: true,
    overlayTitle: "InCity",
    overlaySubtitle: "ATL311 redesign · civic reporting",
    nuggets: [
      { label: "Figma", color: "#a259ff", icon: "FigmaIcon" },
      { label: "Research", color: "#4ade80", icon: "FallingStarIcon" },
      { label: "A11y", color: "#2dd4bf", icon: "Layers01Icon" },
    ],
  },
  {
    slug: "siren",
    title: "Siren",
    kind: "Safety UX · Mobile",
    year: "2025",
    summary:
      "Safety-first dating app exploring trust signals, behavior reporting, and required video verification — refined through iterative usability testing.",
    image: { primary: "heroOcean", fallback: "heroOcean" },
    alt: "Turquoise water and sea foam representing trust, clarity, and a calm safety experience",
    featured: true,
    overlayTitle: "Siren",
    overlaySubtitle: "Safety-first dating app",
    nuggets: [
      { label: "Lean UX", color: "#f97316", icon: "MagicWand01Icon" },
      { label: "Testing", color: "#60a5fa", icon: "GridViewIcon" },
      { label: "Figma", color: "#a259ff", icon: "FigmaIcon" },
    ],
  },
  {
    slug: "resolutions",
    title: "Resolutions",
    kind: "Product UX · Web + App",
    year: "2024",
    summary:
      "Habit-tracking experience helping users organize goals, routines, and progress in one place — designed to cut setup friction.",
    image: null,
    alt: "Habit tracking app screens showing goal setup and progress dashboard",
    overlayTitle: "Resolutions",
    overlaySubtitle: "Habit tracker · goal flows",
    nuggets: [
      { label: "Figma", color: "#a259ff", icon: "FigmaIcon" },
      { label: "Research", color: "#4ade80", icon: "FallingStarIcon" },
      { label: "Prototype", color: "#818cf8", icon: "LayoutTwoColumnIcon" },
    ],
  },
  {
    slug: "logitech",
    title: "Logitech G PRO",
    kind: "Web · Product Storytelling",
    year: "2024",
    // TODO: Case study route + screenshots incomplete — hide card until rebuilt
    status: "incomplete",
    summary:
      "Interactive promotional microsite for the Logitech G PRO mouse — product specs and guided setup delivered through visual storytelling and UX principles.",
    image: null,
    alt: "Promotional website screens for Logitech G PRO mouse",
    overlayTitle: "Logitech G PRO",
    overlaySubtitle: "Promotional microsite · motion",
    nuggets: [
      { label: "HTML/CSS", color: "#e34c26", icon: "CodeCircleIcon" },
      { label: "Motion", color: "#f97316", icon: "FramerIcon" },
      { label: "UX Principles", color: "#c084fc", icon: "MagicWand01Icon" },
    ],
  },
];

/**
 * Aside stack — two marquee lanes (design vs build/AI). Simple Icons CDN SVGs include
 * fill; Adobe + Claude marks are local under public/stack-logos/; VS Code uses Wikimedia.
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
      href: "https://claude.ai/",
      logoUrl: "/stack-logos/claude.svg",
      brandHex: "#d97757",
    },
    {
      label: "ChatGPT",
      href: "https://chatgpt.com/",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg",
      brandHex: "#10a37f",
    },
  ],
];

/** Flat list for search / reuse; marquees use {@link WINNIE_STACK_MARQUEE_LAYERS}. */
export const WINNIE_STACK_TOOLS = WINNIE_STACK_MARQUEE_LAYERS.flat();

/**
 * Contact row — `icon` keys map to Phosphor icons (monochrome stroke, B/W via currentColor).
 */
export const WINNIE_CONTACT_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wineury", icon: "linkedin" },
  // TODO: Confirm X handle before publishing
  { label: "X (Twitter)", href: "https://twitter.com/wineury", icon: "x" },
  // TODO: Confirm Instagram handle before publishing
  { label: "Instagram", href: "https://www.instagram.com/wineury", icon: "instagram" },
  { label: "Email", href: "mailto:wineurya30@gmail.com", icon: "email" },
];

/** Capabilities — UX/Product Design focused. `accent` = tokenized CSS var. */
export const WINNIE_CAPABILITIES = [
  {
    iconKey: "PenTool01Icon",
    title: "UX Research",
    body: "User interviews, usability testing, affinity mapping, competitive audits — research that actually changes the design.",
    accent: "var(--wx-accent-violet)",
  },
  {
    iconKey: "MagicWand01Icon",
    title: "Product Design",
    body: "Flows, wireframes, prototypes, and design systems that connect research to shipped interfaces.",
    accent: "var(--wx-accent-teal)",
  },
  {
    iconKey: "CodeCircleIcon",
    title: "Interaction & Engineering",
    body: "React, Tailwind, GSAP, Lenis — design and build in the same conversation, no handoff gap.",
    accent: "var(--wx-primary)",
  },
  {
    iconKey: "FallingStarIcon",
    title: "Accessibility",
    body: "WCAG best practices, keyboard navigation, and inclusive design baked in from the start.",
    accent: "var(--wx-accent-amber)",
  },
];

// TODO: Replace with a real verified testimonial before publishing.
export const WINNIE_TESTIMONIAL = {
  quote:
    "Winnie rewrote our story with more care than we wrote it ourselves. The site feels like the studio we've been trying to describe for years.",
  attribution: "— Unverified placeholder",
  role: "Replace with real name and context",
};

/** Stats row — calm, factual. */
export const WINNIE_STATS = [
  { value: "12+", label: "Launches shipped", hint: "Marketing sites, product, brand." },
  { value: "6 wk", label: "Median engagement", hint: "From kickoff to public launch." },
  { value: "99", label: "Lighthouse median", hint: "Performance, a11y, SEO." },
];

/** FAQ — questions people actually ask before hiring or collaborating. */
export const WINNIE_FAQ = [
  {
    q: "What do you need from me to get started?",
    a: "A short brief: the problem, who it’s for, any deadlines, and links to what exists today (Figma, staging, or a doc). From there I’ll suggest a lightweight plan and the first milestone.",
  },
  {
    q: "How do you work day to day?",
    a: "Async updates with regular checkpoints — shared Figma, notes from research, and prototypes you can click. For bigger decisions we’ll align on a call; otherwise I keep momentum in the file.",
  },
  {
    q: "Do you design and build?",
    a: "Yes. I design in Figma and ship UI in React with Tailwind (and motion where it helps). That keeps interaction detail from getting lost between design and code.",
  },
  {
    q: "Are you open to contract or full-time?",
    a: "Open to both — contract sprints for a defined scope, or full-time product design roles with research and prototyping in the loop. Tell me what you’re hiring for and we’ll see if it’s a fit.",
  },
  {
    q: "Where are you based?",
    a: "Atlanta, GA — remote-first and happy to overlap EST hours with your team.",
  },
];

/** Availability — lightweight calendar cue. */
export const WINNIE_AVAILABILITY = {
  note: "Taking 2 new engagements this quarter.",
  opening: "Next opening: July 2026",
};
