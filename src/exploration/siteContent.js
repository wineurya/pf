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
  /** Same path as `public/favicon.svg` (radial loader mark + gradient) */
  logoMark: "/favicon.svg",
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
    "Product designer in Atlanta. I take work from research through shipped UI—untangling messy flows into systems teams can build and people can use.",
  primaryCta: { label: "Get in touch", href: "#section-contact" },
  secondaryCta: { label: "View work", href: "#section-work" },
};

/**
 * Work grid — image-first; hover/focus overlays show **role-relevant highlights** (short chips
 * recruiters and hiring managers scan: outcomes, rigor, ownership). Order: flagship first.
 * Deprecated / placeholder entries can use `status: "incomplete"` for the empty-canvas interaction; shipped work should not.
 *
 * **Template / imprint:** use the first entry (Avance) as the guide for new flagship cards — see
 * `src/exploration/WORK_CARD_TEMPLATE.md` for fields, DOM classes, and assets.
 */
export const SITE_WORK = [
  {
    slug: "avance",
    title: "Avance",
    kind: "Coaching · Mobile",
    year: "2025",
    role: "Product Designer",
    workCardVariant: "showcase",
    /** Full-card link to case study (`WorkCardLinkOverlays`); bottom “Case Study” remains as secondary affordance. */
    workCardOpenNavOnlyView: false,
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
    /**
     * Footer mark — Figma Testing `77:486` (frame) + `77:487` (12px orb); local SVG matches dev gradients.
     * @see https://www.figma.com/design/ehQYOquLYoGBReIO32iya0/Testing?node-id=77-486&m=dev
     */
    workCardFooterMark: "/work/avance-footer-mark.svg",
    workCardFooterRotatingLines: [
      "Plan, deadline, real coach.",
      "Plain language → momentum.",
      "Your week holds the line.",
      "Coaching when you slow down.",
    ],
    /** Legacy teaser metadata + non–one-liner cards: hover stutter uses these when footer line is off. */
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
    workCardOpenNavOnlyView: false,
    workCardCaseStudyConnector: true,
    caseStudyPath: "/work/incity",
    workCardAspect: "1/1",
    workCardFigmaNoImage: true,
    workCardImageHighPriority: false,
    workCardFigmaFrame: "200-88",
    workCardFigmaCanvas: "#f4f4f1",
    workCardFigmaLightCanvas: true,
    workCardFooterWarm: true,
    /** Same footer chrome as Avance: default mark (`SITE_FIGMA_ASSETS.logoMark`) + title + rotating line */
    workCardFooterRotatingLines: [
      "Services, updates, reporting — one place.",
      "Right when you need it.",
      "Welcome → tags → chat prompts → resolution.",
      "Less hunting across city sites.",
    ],
    workCardNuggetsMonochrome: true,
    workCardNuggetsAriaLabel: "Product signals",
    nuggets: [
      { label: "Service discovery", color: "#ffffff", icon: "Layout01Icon" },
      { label: "Citizen reporting", color: "#e5e5e5", icon: "QuoteUpIcon" },
      { label: "Status prompts", color: "#404040", icon: "Calendar01Icon" },
    ],
    workCardTeaserLead: "All-in-one access to city services, updates, and support.",
    workCardStutters: [],
    workCardFinale: "Right when you need it.",
    summary:
      "Civic app: welcome flow, service tags, and chat prompts for city issues, updates, and reporting.",
    alt: "InCity — civic mobile concept",
    featured: true,
    overlayTitle: "InCity",
    overlaySubtitle: "Civic app · services + reporting",
    workCardAccessibleLabel: "InCity — open case study.",
  },
  {
    slug: "siren",
    title: "Siren",
    kind: "Safety · Product",
    year: "2024",
    role: "Product Designer",
    workCardVariant: "showcase",
    workCardOpenNavOnlyView: false,
    workCardCaseStudyConnector: true,
    caseStudyPath: "/work/siren",
    workCardAspect: "1/1",
    workCardFigmaNoImage: true,
    workCardImageHighPriority: false,
    workCardFigmaFrame: "200-88",
    workCardFigmaCanvas: "#f3f3f2",
    workCardFigmaLightCanvas: true,
    workCardFooterWarm: true,
    workCardFooterRotatingLines: [
      "Trust signals without the wall of text.",
      "Safety that doesn't shout.",
      "Verification-heavy — still human.",
      "Clear states, fewer dead ends.",
    ],
    workCardNuggetsMonochrome: true,
    workCardNuggetsAriaLabel: "Focus areas",
    nuggets: [
      { label: "Trust signals", color: "#ffffff", icon: "Layout01Icon" },
      { label: "Guardrails", color: "#e5e5e5", icon: "Calendar01Icon" },
      { label: "Calm UI", color: "#404040", icon: "QuoteUpIcon" },
    ],
    workCardTeaserLead: "From trust signals to verification — without a wall of text.",
    workCardStutters: [],
    workCardFinale: "Safety that doesn't shout.",
    summary: "Verification-heavy flows with calmer copy, clearer states, and fewer dead ends.",
    alt: "Siren — safety product exploration",
    featured: true,
    overlayTitle: "Siren",
    overlaySubtitle: "Trust + verification",
  },
  {
    slug: "resolutions",
    title: "Resolutions",
    kind: "Product · Habit",
    year: "2023",
    role: "Product Designer",
    workCardVariant: "showcase",
    workCardOpenNavOnlyView: false,
    workCardCaseStudyConnector: true,
    caseStudyPath: "/work/resolutions",
    workCardAspect: "1/1",
    workCardFigmaNoImage: true,
    workCardImageHighPriority: false,
    workCardFigmaFrame: "200-88",
    workCardFigmaCanvas: "#f4f4f1",
    workCardFigmaLightCanvas: true,
    workCardFooterWarm: true,
    workCardFooterRotatingLines: [
      "Scroll-first rhythm, quiet structure.",
      "Space for momentum to land.",
      "Onboarding → routines → return visits.",
      "Editorial pacing before dense copy.",
    ],
    workCardNuggetsMonochrome: true,
    workCardNuggetsAriaLabel: "Product beats",
    nuggets: [
      { label: "Rhythm", color: "#ffffff", icon: "Calendar01Icon" },
      { label: "Routines", color: "#e5e5e5", icon: "FallingStarIcon" },
      { label: "Return use", color: "#404040", icon: "Layout01Icon" },
    ],
    workCardTeaserLead: "A habit app pass with scroll-first rhythm and quiet structure.",
    workCardStutters: [],
    workCardFinale: "Space for momentum to land.",
    summary: "Onboarding, routines, progress, and return — stills and pacing before dense copy.",
    alt: "Resolutions — habit product treatment",
    featured: true,
    overlayTitle: "Resolutions",
    overlaySubtitle: "Habits · editorial pace",
  },
  {
    slug: "kinetix",
    title: "Kinetix",
    kind: "Brand · Product UI",
    year: "2025",
    role: "Product Designer",
    workCardVariant: "showcase",
    workCardOpenNavOnlyView: false,
    workCardCaseStudyConnector: true,
    caseStudyPath: "/design/kinetix",
    workCardAspect: "1/1",
    workCardFigmaNoImage: true,
    workCardImageHighPriority: false,
    workCardFigmaFrame: "200-88",
    workCardFigmaCanvas: "#f5f5f4",
    workCardFigmaLightCanvas: true,
    workCardFooterWarm: true,
    workCardFooterRotatingLines: [
      "Brand voice meets shipping UI.",
      "Measured, not ornamental.",
      "Display type, density, motion — systematic.",
      "Bold brand bar, real components.",
    ],
    workCardNuggetsMonochrome: true,
    workCardNuggetsAriaLabel: "System pieces",
    nuggets: [
      { label: "Display type", color: "#ffffff", icon: "GridTableIcon" },
      { label: "Components", color: "#e5e5e5", icon: "Layers01Icon" },
      { label: "Motion", color: "#404040", icon: "MagicWand01Icon" },
    ],
    workCardTeaserLead: "A tighter bridge between brand voice and shipping UI.",
    workCardStutters: [],
    workCardFinale: "Measured, not ornamental.",
    summary: "Display type, density, and motion notes for a product with a bold brand bar.",
    alt: "Kinetix — marketing surface exploration",
    featured: true,
    overlayTitle: "Kinetix",
    overlaySubtitle: "System stress test",
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
