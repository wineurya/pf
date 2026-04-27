/** One-page sections: right column scroll drives tab state. */
export const SECTION_IDS = [
  "section-work",
  "section-studio",
  "section-approach",
  "section-contact",
];

export const SECTION_TABS = [
  { id: "work", label: "Work", sectionId: "section-work" },
  { id: "studio", label: "Studio", sectionId: "section-studio" },
  { id: "approach", label: "Approach", sectionId: "section-approach" },
  { id: "contact", label: "Contact", sectionId: "section-contact" },
];

/**
 * Resolved hex values of the four accent tokens (see `src/styles/tokens.css`).
 * Used for chip fills where `labelOnChipFill()` needs raw hex for luminance math.
 * Keep in sync with `--wx-primary`, `--wx-accent-teal`, `--wx-accent-violet`, `--wx-accent-amber`.
 */
export const SITE_ACCENT_HEX = {
  primary: "#2563eb",
  teal: "#0d9488",
  violet: "#7c3aed",
  amber: "#d97706",
};

/**
 * Exported from Figma MCP (node 146:15377). MCP URLs expire ~7 days, so we now
 * treat the Unsplash fallbacks as the *primary* hero source and only fall back
 * to MCP when an explicit Figma export is requested.
 * @see https://www.figma.com/design/Qr0YJLIekI7fli6N6nKgzB/Design-Exploration?node-id=146-15377
 */
export const SITE_FIGMA_ASSETS = {
  heroMountain: "https://www.figma.com/api/mcp/asset/df18d447-515f-49a2-a1ea-e0a3cdae9b41",
  heroOcean: "https://www.figma.com/api/mcp/asset/3c8a4aa9-c288-4b68-bd5d-8bffdce84853",
  /** Same path as `public/favicon.svg` (Figma mark + token gradient) */
  logoMark: "/favicon.svg",
  statusDot: "https://www.figma.com/api/mcp/asset/7ffad080-da58-444b-aa73-1a9edcddd2b5",
  /** Headline sparkle (SVG) — tint via CSS mask + `--wx-primary` in `ExplorationHomePage` */
  headlineSparkle: "https://www.figma.com/api/mcp/asset/abd085fc-42a7-4771-9064-a14f55e15d8c",
};

/** Stable Unsplash sources — promoted to primary because Figma MCP URLs expire. */
export const SITE_IMAGE_FALLBACKS = {
  heroMountain: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85",
  heroOcean: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=2000&q=85",
};

/** Supporting sections (not in base wireframe stills). */
export const SITE_EXTRA_IMAGES = {
  marble: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
  gradient: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=85",
  aurora: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=85",
  studioDesk: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=85",
  typography: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?auto=format&fit=crop&w=1600&q=85",
  workshop: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1600&q=85",
};

/** Hero copy — calm baseline. One promise, one CTA, one secondary anchor. */
export const SITE_HERO = {
  eyebrow: "Available for projects",
  headline: "Designs that feel",
  subhead:
    "I'm Wineury — a product designer in Atlanta. I help early-stage teams turn messy flows into accessible, shipped interfaces.",
  primaryCta: { label: "Get in touch", href: "#section-contact" },
  secondaryCta: { label: "View work", href: "#section-work" },
};

/**
 * Work grid — image-first; hover/focus overlays show **role-relevant highlights** (short chips
 * recruiters and hiring managers scan: outcomes, rigor, ownership). Order: flagship first.
 * Deprecated / placeholder entries can use `status: "incomplete"` for the empty-canvas interaction; shipped work should not.
 */
export const SITE_WORK = [
  {
    slug: "avance",
    title: "Avance",
    kind: "Coaching · Mobile",
    year: "2025",
    role: "Product Designer",
    workCardVariant: "showcase",
    /** Card click: hide all but top nav; “Case Study” is the route to the write-up. */
    workCardOpenNavOnlyView: true,
    /** Bottom-right Case Study + arrow (separate from card click / nav-only mode). */
    workCardCaseStudyConnector: true,
    caseStudyPath: "/work/avance",
    /** Square mock (1:1). Other work cards default to 16:9. */
    workCardAspect: "1/1",
    /**
     * Optional full-bleed background. `null` = neutral empty canvas (site-wide default).
     * Figma `200:109` (two-phone mock) — `avance-hero.webp` (primary) + `avance-hero.png` (fallback), optimized from Figma MCP export.
     * Layout: `200:88` (2400×2400) — canvas + centered mock (see `workCardFigmaFrame`).
     * @see ./avance.md
     */
    workCardBackgroundImage: "/work/avance-hero.png",
    workCardBackgroundWebp: "/work/avance-hero.webp",
    workCardImageHighPriority: true,
    /** Figma `Testing/200:88` — canvas #E3DBD1, mock 1410.14×1490.18px, centered, warm shadow. */
    workCardFigmaFrame: "200-88",
    /** No black scrim; warm title + rgba subcopy only (`wx-work-card__shell--footer-warm`). */
    workCardFooterWarm: true,
    /** Lead is always visible; hover types `workCardFinale` (optional 0–2 `workCardStutters` run first). */
    workCardTeaserLead:
      "Say your goal in plain language. Avance returns a plan, a deadline, and a coach in your corner.",
    workCardStutters: [],
    workCardFinale: "Said once—then the week holds the line.",
    /** Card `aria-label` and non-stutter teasers: product fact; visible stutter = lead + typed finale. */
    summary:
      "Mobile coaching. Plain-language goals become a plan, a deadline, and a coach in your corner when progress slows.",
    alt: "Avance app mockups: goal input and plan summary with goal, deadline, and coaching highlights",
    featured: true,
    overlayTitle: "Avance",
    overlaySubtitle: "Goal → plan · mobile coaching flow",
    /** Monochrome nuggets (see `workCardNuggetsMonochrome` + `site-canvas.css`). */
    workCardNuggetsAriaLabel: "Outcomes and ways of working",
    workCardNuggetsMonochrome: true,
    nuggets: [
      { label: "Outcome clarity", color: "#ffffff", icon: "Layout01Icon" },
      { label: "Structured cadence", color: "#e5e5e5", icon: "Calendar01Icon" },
      { label: "Progress habits", color: "#404040", icon: "FallingStarIcon" },
      { label: "1:1 coaching", color: "#0a0a0a", icon: "QuoteUpIcon" },
    ],
  },
  {
    slug: "incity",
    title: "InCity",
    kind: "Civic · Mobile",
    year: "2024",
    role: "Product Designer",
    workCardVariant: "showcase",
    workCardOpenNavOnlyView: true,
    workCardCaseStudyConnector: true,
    caseStudyPath: "/work/incity",
    workCardAspect: "1/1",
    /**
     * Gallery: no hero bitmap — 200:88 field + default mock slot only (see `workCardFigmaNoImage`). Case page may still use
     * `/work/incity-hero.png` in `work-cases` data.
     * @see https://www.figma.com/design/zxOvL9r7aK2GqiBTUcgGei/InCity?node-id=458-10858
     */
    workCardFigmaNoImage: true,
    workCardImageHighPriority: false,
    workCardFigmaFrame: "200-88",
    /** Figma artboard: clean light field around the mock (letterbox + load state) */
    workCardFigmaCanvas: "#f4f4f1",
    /** Paper-like grain: multiply, not `soft-light` (reserved for dark canvases) */
    workCardFigmaLightCanvas: true,
    /** Figma 458:10858 — hero-only: no in-card title/teaser; copy is in the mock. */
    workCardOmitTopChrome: true,
    workCardOmitFooter: true,
    workCardOmitScrim: true,
    workCardCaseStudyConnector: false,
    /** Not shown when footer is omitted; kept for search/case page metadata. */
    workCardTeaserLead: "All-in-one access to city services, updates, and support.",
    workCardStutters: [],
    workCardFinale: "Right when you need it.",
    summary: "Civic app: welcome flow, service tags, and chat prompts for city issues, updates, and reporting.",
    workCardAccessibleLabel: "InCity. Click for focused project view.",
    alt: "InCity project (gallery preview uses canvas only, no art)",
    featured: true,
    overlayTitle: "InCity",
    overlaySubtitle: "Civic app · services + reporting",
    nuggets: [],
  },
];

/**
 * Aside stack — two marquee lanes (design vs build/AI). Simple Icons CDN SVGs include
 * fill; Adobe + Claude marks are local under public/stack-logos/; VS Code uses Wikimedia.
 */
export const SITE_STACK_MARQUEE_LAYERS = [
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

/** Flat list for search / reuse; marquees use {@link SITE_STACK_MARQUEE_LAYERS}. */
export const SITE_STACK_TOOLS = SITE_STACK_MARQUEE_LAYERS.flat();

/**
 * Contact row — `icon` keys map to Phosphor icons (monochrome stroke, B/W via currentColor).
 * Verified channels only. X / Instagram removed until handles confirmed.
 */
export const SITE_CONTACT_SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/wineury", icon: "linkedin" },
  { label: "Email", href: "mailto:wineurya30@gmail.com", icon: "email" },
];

/**
 * Services — a flat list, not a sales menu. One line each. No prices, no codes,
 * no icons, no timelines on the surface. Buyers who care about scope or budget
 * email and ask. The references (Reynolds, Rusli, Carignan) all do this.
 * Pricing lives in the FAQ; scope lives in the SOW.
 */
export const SITE_SERVICES = [
  {
    slug: "discovery",
    title: "Discovery sprints",
    body: "Interviews, usability tests, friction maps. Two weeks.",
  },
  {
    slug: "landing",
    title: "Conversion landing systems",
    body: "Designed and built in React. Three weeks.",
  },
  {
    slug: "revamp",
    title: "Product UX revamps",
    body: "Research, prototype, validate, ship. Four to eight weeks.",
  },
  {
    slug: "retainer",
    title: "Design partner retainers",
    body: "Embedded weekly. Monthly. Three-month minimum.",
  },
];

/**
 * Empty until a real, attributable quote is captured. Rendering code should
 * gracefully skip the testimonial card when this array is empty.
 */
export const SITE_TESTIMONIALS = [];

/** Stats row — calm, factual, buyer-relevant (not vanity craft signals). */
export const SITE_STATS = [
  {
    value: "6 wk",
    label: "Median engagement",
    hint: "From kickoff to public launch.",
  },
  {
    value: "2 rounds",
    label: "Usability testing",
    hint: "On every product engagement, not just discovery.",
  },
  {
    value: "100%",
    label: "Build-ready handoff",
    hint: "Specs or shipped front-end code, every project.",
  },
];

/** FAQ — questions people actually ask before hiring or collaborating. */
export const SITE_FAQ = [
  {
    q: "What does a project cost?",
    a: "Engagements range from $1.2k for a one-week audit to $11k+ for a full product UX revamp with shipped front-end. Retainers from $5.5k/month, three-month minimum. Email me with what you're working on and I'll send a fitted scope.",
  },
  {
    q: "What won't you take on?",
    a: "Sixty-page strategy decks before any pixels. Process for the sake of process. Work where research isn't welcome. Designs that can't actually be built. If we're not a fit, I'll say so quickly.",
  },
  {
    q: "What if I don't know my outcome metrics yet?",
    a: "We'll define them in week one. For most product engagements that means task completion, time-on-task, and a confidence survey before and after — measured with five to seven test participants. You'll leave the project knowing what moved.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short brief: the problem, who it's for, any deadlines, and links to what exists today (Figma, staging, or a doc). From there I'll suggest a lightweight plan and the first milestone.",
  },
  {
    q: "How do you work day to day?",
    a: "Async updates with regular checkpoints — shared Figma, notes from research, and prototypes you can click. For bigger decisions we'll align on a call; otherwise I keep momentum in the file.",
  },
  {
    q: "Do you design and build?",
    a: "Yes. I design in Figma and ship UI in React with Tailwind (and motion where it helps). That keeps interaction detail from getting lost between design and code.",
  },
  {
    q: "Are you open to contract or full-time?",
    a: "Open to both — contract sprints for a defined scope, or full-time product design roles with research and prototyping in the loop. Tell me what you're hiring for and we'll see if it's a fit.",
  },
  {
    q: "Where are you based?",
    a: "Atlanta, GA — remote-first and happy to overlap EST hours with your team.",
  },
];

/** Availability — lightweight calendar cue. */
export const SITE_AVAILABILITY = {
  note: "Taking 2 new engagements this quarter.",
  opening: "Next opening: July 2026",
};

/**
 * Contact form — minimal. Three fields. Email is the parallel option.
 * Anything more belongs in the email itself.
 */
export const SITE_QUALIFICATION_FIELDS = [
  { id: "name", label: "Your name", type: "text", required: true, placeholder: "First and last" },
  {
    id: "focus",
    label: "What are you working on?",
    type: "textarea",
    required: true,
    placeholder: "A few sentences. What it is, what's stuck, when you'd like to start.",
  },
  { id: "links", label: "Links (optional)", type: "text", placeholder: "Figma, staging, repo, anything I should see" },
];
