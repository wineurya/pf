/* Portfolio content: work = case studies; exploration = /exploration demos.
   About paragraphs may be arrays of segments: strings render as text, and
   { word, photos } objects render as interactive hover words (see HoverWord). */

import dogPoodle from "./assets/about/about-dog-02.jpg";
import dogSpaniel from "./assets/about/about-dog-01.jpg";
import foodBirria from "./assets/about/about-food-03.jpg";
import foodFriedChicken from "./assets/about/about-food-01.jpg";
import foodIzakaya from "./assets/about/about-food-02.jpg";
import gymMirror from "./assets/about/about-gym-02.jpg";
import gymSelfie from "./assets/about/about-gym-01.jpg";
import milesPlush from "./assets/about/about-collectible-01.jpg";
import travelBallpark from "./assets/about/about-travel-03.jpg";
import travelBeach from "./assets/about/about-travel-01.jpg";
import travelDrStreet from "./assets/about/about-travel-02.jpg";
import vinylOxymoron from "./assets/about/about-vinyl-01.jpg";

/* Case-study cover art (Figma "Asset Priority Matrix"). The hero sizes itself to
   the image's intrinsic aspect ratio, so each cover keeps its own proportions. */
import incityCover from "./assets/case/incity-cover.webp";
import kinetixCover from "./assets/case/kinetix-cover.webp";
import avanceCover from "./assets/case/avance-cover.webp";
import logitechCover from "./assets/case/logitech-cover.webp";
import resolutionsCover from "./assets/case/resolutions-cover.webp";
import sirenCover from "./assets/case/siren-cover.webp";

/* InCity "old flow" screen recording (the original ATL311 on mobile). Recorded at
   the iPhone Pro Max logical resolution; its own status bar is cropped in the
   phone mock and replaced with a clean synthetic one. WebM first, mp4 fallback. */
import incityOldFlowWebm from "./assets/case/incity-old-flow.webm";
import incityOldFlowMp4 from "./assets/case/incity-old-flow.mp4";
import incityOldFlowPoster from "./assets/case/incity-old-flow-poster.jpg";

/* InCity research/wireframe/feature stills, hand-picked from the legacy Framer
   site and converted to WebP (see docs/agent-handoff.md "Legacy portfolio assets"). */
import incityResearchInterviews from "./assets/case/incity-research-interviews.webp";
import incityResearchAudit from "./assets/case/incity-research-audit.webp";
import incityResearchLitReview from "./assets/case/incity-research-litreview.webp";
import incityWireframesLowFi from "./assets/case/incity-wireframes-lowfi.webp";
import incityFeatureDesignSystem from "./assets/case/incity-feature-designsystem.webp";
import incityFeatureVerification from "./assets/case/incity-feature-verification.webp";

/* Case studies, keyed by slug; the Work list uses CASE_STUDY_ORDER so row labels
   and page titles stay in sync.

   `facts` is { role, team, duration, tools }; tools render as an icon-only array.
   `blocks` carry the body in a few low-fi layouts: { p } paragraph,
   { media, title, sub } full-width tile — a placeholder unless it carries a real
   asset: `src` (+ `alt`, `portrait` for a phone screen) renders the image at its
   own ratio, or `media: "phone-video"` + `video` renders a framed recording;
   { mosaic: [{ src, alt }], title?, sub? } a staggered image collage,
   { cols: [{ title, sub, media? }] } 2- or 3-up cells,
   { feat, title, sub, media, src?, alt?, portrait?, frameBg? } a Features-section
   card — frameBg pins a 4:3 frame, contain-fits the image, and fills letterbox with
   that color, and
   { title, stats: [{ value, text }] } titled intro + 3-up stat columns.
   A { section: "Title" } marker opens a new body section with an anchor id and a
   contents-nav entry. Titled paragraph blocks use { title, p }. */
export const caseStudies = {
  avance: {
    title: "Avance",
    meta: "Goal Coaching",
    hero: "image",
    cover: avanceCover,
    coverAlt: "Avance goal-coaching app cover",
    /* Work in progress — listed but locked (no open, no deep-link). */
    wip: true,
    facts: {
      role: "UX Engineer",
      team: "Solo",
      duration: "Mar – May 2025",
      tools: ["Figma", "Cursor", "Claude", "Photoshop"],
    },
    intro:
      "Avance is a quiet goal-coaching concept: speak the goal, get a dated plan, and return to a coach that notices drift before a streak turns into shame.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of Avance",
        p: "Most goal apps ask people to prove discipline every day. Avance asks for one honest goal, then turns it into dates, weekly check-ins, and ==a coach who can respond when momentum drops==.",
      },
      {
        title: "What changed in the concept?",
        p: "The prototype stayed intentionally small: one goal input and one plan summary. That constraint replaced the usual dashboard sprawl with something ==closer to working with a person==.",
      },
      { section: "The idea" },
      {
        title: "The risk was not forgetting the goal. It was avoiding the app.",
        p: "Streaks work until they break. After that, the interface becomes proof of failure. Avance was shaped around a softer loop: ==real dates, a real voice, and a visible next check-in==.",
      },
      {
        media: "image",
        title: "Two screens, one job.",
        sub: "The input captures the goal in plain language. The summary gives it a deadline, a next check-in, and a coach note that sounds like follow-up instead of automation.",
      },
      {
        title: "The product shape became the argument.",
        p: "I resisted adding progress charts, badges, and social pressure. The useful direction was ==less dashboard, more correspondence==: a product that feels like someone will ask how it is going.",
      },
    ],
  },
  incity: {
    title: "InCity",
    meta: "Civic Reporting",
    hero: "video",
    cover: incityCover,
    coverAlt:
      "InCity status chip reading Awaiting Inspection over a soft gradient background",
    facts: {
      role: "Lead UX Designer & Researcher",
      team: "Team of 6",
      duration: "Feb – Apr 2025",
      tools: ["Figma & FigJam", "Lottie", "After Effects"],
    },
    intro:
      "InCity reworks ATL311 into a mobile-first civic hub where a resident can file a report, track it, and see the city answer back.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of InCity",
        p: "ATL311 made a small civic action feel like paperwork. InCity rebuilt the path around ==a shorter mobile flow, clear city updates, and case tracking== residents could return to.",
      },
      {
        title: "What was the outcome?",
        p: "In prototype testing, task completion became ==75% faster==, errors fell from ==30% to about 5%==, and ==abandoned submissions disappeared==. The concept also earned recognition from Kennesaw's Assistant City Manager.",
      },
      { section: "The problem" },
      {
        title: "ATL311 buried a simple report inside a desktop workflow.",
        p: "The existing flow asked mobile users to fight tiny controls, hidden menus, and unclear status. For a pothole, a broken light, or a blocked sidewalk, that was enough friction for ==residents to abandon submissions in frustration==.",
      },
      {
        media: "phone-video",
        video: {
          webm: incityOldFlowWebm,
          mp4: incityOldFlowMp4,
          poster: incityOldFlowPoster,
        },
        title: "The old ATL311, on a phone.",
        sub: "Desktop layout squeezed onto mobile: tiny controls, hidden menus, no sense of where a report goes. The starting point we set out to replace.",
      },
      {
        cols: [
          {
            title: "Desktop-first design",
            sub: "Mobile users get tiny controls and hidden menus.",
          },
          {
            title: "Buried workflows",
            sub: "Eight steps to submit a single report.",
          },
          {
            title: "Opaque status",
            sub: "After you submit, there is no indication that the city saw it.",
          },
        ],
      },
      { section: "Research" },
      {
        title: "Research started with real voices.",
        sub: "Four Atlanta residents and two city officials, including Marty Hughes, Assistant City Manager of Kennesaw, described how people experience 311 and how they would improve it on mobile — backed by a competitive audit and a literature review.",
        mosaic: [
          {
            src: incityResearchInterviews,
            alt: "Remote interview session with an Atlanta resident",
          },
          {
            src: incityResearchAudit,
            alt: "Competitive audit comparing NYC311, Austin311, and CHI311",
          },
          {
            src: incityResearchLitReview,
            alt: "Literature review notes on civic accessibility",
          },
        ],
      },
      {
        title: "Atlanta was falling behind cities that made status visible.",
        p: "A competitive audit of NYC311, Austin311, and CHI311 made the gap concrete. Other cities gave residents ==clean layouts, real-time maps, and bookmarking==; Atlanta left them hunting for the next step.",
      },
      {
        title: "Accessibility meant removing everyday barriers.",
        p: "The literature review widened the brief. Accessibility was not a compliance checkbox; it was the work of ==removing everyday barriers== so more residents could take part in city upkeep.",
      },
      {
        cols: [
          {
            title: "Reliable alerts",
            sub: "Residents still lean on local news and TV, so push alerts for weather, traffic, and events had to be dependable.",
          },
          {
            title: "Payments that work",
            sub: "Digital payments worked half the time; permits and applications still forced in-person trips.",
          },
          {
            title: "Privacy first",
            sub: "Security concerns, especially among older users, called for transparent, trustworthy flows.",
          },
        ],
      },
      { section: "Personas" },
      {
        cols: [
          {
            media: "image",
            title: "Alex, the everyday resident",
            sub: "Reports from his phone during commutes. Wants instant confirmation, high contrast, and proof the city heard him.",
          },
          {
            media: "image",
            title: "Blake, the overloaded staffer",
            sub: "Manages endless requests. Needs routing, prioritization through upvotes, and tracking that doesn't bury him.",
          },
        ],
      },
      { section: "Wireframes" },
      {
        media: "image",
        src: incityWireframesLowFi,
        alt: "Low-fidelity wireframe board — the full screen set laid out",
        title: "Every good design starts a bit messy.",
        sub: "A single rough screen grew into a full wireframe set and one clear journey from report to resolution.",
      },
      {
        title: "Medium fidelity tested clarity before polish.",
        p: "Medium fidelity gave the team enough structure to test the important questions before visual polish: Can residents find the right report type? Do they trust the status? Does the flow ==hold up for accessibility and clarity==?",
      },
      { section: "Features" },
      {
        title: "Six features carried the high-fidelity experience.",
        p: "High fidelity turned the redesign into a working product. Each feature closes a specific gap the original ATL311 left open, spanning Visual identity, Accessibility, and Interaction from first tap to final confirmation.",
        guide: [
          { term: "Visual identity", count: 2, icon: "visual" },
          { term: "Accessibility", count: 2, icon: "access" },
          { term: "Interaction", count: 2, icon: "interaction" },
        ],
      },
      {
        feat: true,
        icon: "palette",
        title: "Changeable theme",
        sub: "The interface changes with you: bright for clarity outdoors and dark for comfort at night.",
        media: "image",
      },
      {
        feat: true,
        icon: "layers",
        title: "Design system",
        sub: "Soft corners, crisp feedback, and playful touches like bouncing pins. Every tap feels predictable and alive.",
        media: "image",
        src: incityFeatureDesignSystem,
        alt: "InCity design system — color, type, and component tokens",
        frameBg: "#07080B",
      },
      {
        feat: true,
        icon: "grid",
        title: "Type & iconography",
        sub: "Clean type paired with purposeful icons that scale together, so nothing falls out of rhythm.",
        media: "image",
      },
      {
        feat: true,
        icon: "user",
        title: "Onboarding verification",
        sub: "Enter your number, confirm with a text code, you're in. Familiar, fast, grounded in trust.",
        media: "image",
        src: incityFeatureVerification,
        alt: "Phone-number verification screen during onboarding",
        portrait: true,
      },
      {
        feat: true,
        icon: "map",
        title: "Interactive map",
        sub: "The city at your fingertips. Cases appear as dots you can tap to see details, follow their status, and feel the progress in real time.",
        media: "prototype",
      },
      {
        feat: true,
        icon: "clipboard",
        title: "Proof every time",
        sub: "Every submission lands somewhere visible: a confirmation screen, a case detail, and a receipt when payment is involved. ==There is no guessing whether an action went through==.",
        media: "image",
      },
      { section: "Outcomes" },
      {
        title: "Testing made the gains real.",
        p: "Prototype testing turned the redesign into measurable evidence.",
      },
      {
        cols: [
          {
            title: "75% faster",
            sub: "Task completion time after iterative testing; the flow went from six steps to three.",
          },
          {
            title: "30% → 5%",
            sub: "Error rate, from clearer inputs.",
          },
          {
            title: "Zero drop-offs",
            sub: "Abandoned submissions disappeared entirely.",
          },
        ],
      },
      {
        media: "wireframe",
        title: "Six steps down to three.",
        sub: "The before-and-after flow comparison from usability testing shows where time and errors fell away.",
      },
      {
        title: "The city finally answered back.",
        p: "The redesign also earned ==recognition from the Assistant City Manager of Kennesaw==, who praised its potential impact if implemented. The strongest shift was emotional: the city finally answers back.",
      },
    ],
  },
  siren: {
    title: "Siren",
    meta: "Safer Dating",
    hero: "image",
    cover: sirenCover,
    coverAlt: "Siren safer dating app cover",
    facts: {
      role: "UX/UI Designer",
      team: "Team of 5",
      duration: "4 weeks · 2023",
      tools: ["Figma", "Miro", "Google Slides"],
    },
    intro:
      "Siren is a safety-first dating prototype that tests how much context people need before they trust a match enough to meet.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of Siren",
        p: "Siren explored whether ==behavior flags and a required video call== could add context before an in-person date without making the app feel punitive.",
      },
      {
        title: "What was the outcome?",
        p: "Both tested features ==increased how safe and confident participants felt==. The open question was not whether safety mattered; it was how clearly the app should explain a risk signal.",
      },
      { section: "The experiment" },
      {
        title: "The team treated safety as a testable assumption.",
        p: "The riskiest assumption was that people wanted ==safety and meaningful connections, not endless matches==. We used an eight-box canvas to rank what mattered, then tested the smallest version of the two highest-risk ideas.",
      },
      {
        media: "wireframe",
        title: "The Lean UX canvas.",
        sub: "Eight boxes of assumptions and hypotheses ranked by risk and value mapped the experiment before a single screen.",
      },
      {
        cols: [
          {
            title: "Aubrey, 25, proto-persona",
            sub: "Busy, cautious, new to dating apps. She wants control over her dating pool without reading every profile like a background check.",
          },
          {
            title: "Two features to test",
            sub: "Profile report callouts, then a required video call after a set number of texts.",
          },
        ],
      },
      { section: "Sprint 1" },
      {
        media: "image",
        title: "Sprint 1: flags on profiles.",
        sub: "Green, yellow, red: no offenses, minor offenses, harassment. Tested as low-fi profiles with campus participants.",
      },
      {
        title: "Placement mattered more than the flag itself.",
        p: "Flags made people feel safer, but ==placement mattered more than the flag itself==. Reports felt overwhelming when exposed by default, so the safer pattern moved detail behind a toggle. People could tolerate yellow flags; red flags needed a clearer definition.",
      },
      { section: "Sprint 2" },
      {
        media: "image",
        title: "Sprint 2: the required video call.",
        sub: "After the text limit, the app gives people ten messages to plan when they will connect by video.",
      },
      {
        title: "Verification raised trust even when the requirement felt strict.",
        p: "In testing, participants ==spotted the staged catfish during the call==. Trust went up, even though the requirement felt strict. Most accepted the call when the app framed it as a safety net instead of a punishment.",
      },
      {
        cols: [
          {
            title: "No early calls",
            sub: "Calls unlock only after the text threshold.",
          },
          {
            title: "A heads-up",
            sub: "A notice when you're nearing the message cap.",
          },
          {
            title: "Schedule in chat",
            sub: "Plan the call like a person, not a system prompt.",
          },
        ],
      },
      { section: "Retrospective" },
      {
        title: "Trust held up; the definition of a red flag did not.",
        p: "The flag system and verification call supported trust and transparency, but the reporting model needed more precision. One question stayed unresolved: ==what exactly qualifies as a red flag==, and who gets to decide?",
      },
      {
        media: "wireframe",
        title: "The high-fidelity pass.",
        sub: "The final reporting flow made flag definitions, disclosure, and the primary action clearer.",
      },
    ],
  },
  resolutions: {
    title: "Resolutions",
    meta: "Habit Building",
    hero: "image",
    cover: resolutionsCover,
    coverAlt: "Resolutions habit-building app cover",
    facts: {
      role: "UI/UX & Research",
      team: "Team of 5",
      duration: "Jan – Apr 2023",
      tools: ["Figma", "Illustrator", "InDesign"],
    },
    intro:
      "Resolutions turns scattered goals, habits, budgets, meals, schoolwork, and accountability into one daily check-in.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of Resolutions",
        p: "The problem was not ambition. People had goals; they were just split across too many tools. Resolutions brought planning, habits, money, meals, school, and community into ==one flexible daily home==.",
      },
      {
        title: "What was the outcome?",
        p: "Four months of research, modeling, and usability testing produced a prototype people described as ==simple and clean== because it made the daily path obvious.",
      },
      { section: "The problem" },
      {
        title: "Habit change starts against steep odds.",
        stats: [
          {
            value: "92%",
            text: "of people fail to reach their New Year's goals.",
          },
          {
            value: "45%",
            text: "of daily habits happen automatically.",
          },
          {
            value: "60%",
            text: "more likely to stay consistent when sharing progress.",
          },
        ],
      },
      {
        title: "The problem was fragmentation, not a lack of apps.",
        p: "The vision statement came almost verbatim from a user: 'How can I pack my life into one app?' People were not failing because they lacked tools. They were failing because ==each part of life lived in a different one==.",
      },
      {
        media: "wireframe",
        title: "One routine, five apps.",
        sub: "Planning, budgeting, and habits lived in separate places. Resolutions set out to fold them into one routine.",
      },
      { section: "Research" },
      {
        title: "People wanted structure, community, and control over reminders.",
        p: "The research loop combined habit-formation literature, a competitive audit, and interviews. Habit tracked behavior but lacked community; Notion organized everything but felt business-first. Jack wanted structure and friendly competition. Kayli wanted smaller tasks and notifications she could shape. ==Both wanted control, not another nagging system==.",
      },
      {
        media: "wireframe",
        title: "The research wall.",
        sub: "Literature notes, the competitive audit, and interview takeaways pinned into one picture of what people actually wanted.",
      },
      { section: "Personas" },
      {
        cols: [
          {
            media: "image",
            title: "Tia, 22: primary persona",
            sub: "Full-time student, part-time barista in Alpharetta. Her day moves between class, shifts, groceries, water, assignments, and a long-term architecture goal.",
          },
          {
            title: "Designed for the daily check",
            sub: "Mobile first, low complexity, calendar-aware, and built for one person checking in once a day.",
          },
        ],
      },
      { section: "Design" },
      {
        media: "image",
        title: "From napkin sketch to something real.",
        sub: "Hand-drawn planner, meals, and community boards became wireframes, then prototypes, then usability tests.",
      },
      { section: "Features" },
      {
        cols: [
          {
            title: "A morning rhythm",
            sub: "Wake and sleep times frame the day; a wellness check captures mood and energy before water, bed, breakfast, and tasks appear.",
          },
          {
            title: "Public + private boards",
            sub: "The habit tracker stays private; the budget group can cheer you on. Community never has to expose the whole routine.",
          },
        ],
      },
      {
        media: "wireframe",
        title: "A day in the app.",
        sub: "Morning check-in, routines, and community boards connect the private and shared parts of the experience.",
      },
      {
        title: "Simple and clean was a result, not a stopping point.",
        p: "Users called the interface simple and clean. That mattered because the product carried a lot of life admin, but it was ==not a reason to stop testing==. The next pass would need sharper prioritization, not more features.",
      },
    ],
  },
  logitech: {
    title: "Logitech",
    meta: "Promo Landing",
    hero: "image",
    cover: logitechCover,
    coverAlt:
      "Logitech G PRO X Superlight promo landing with hero mouse, feature cards, and nebula backdrop",
    facts: {
      role: "UI Design",
      team: "Solo",
      duration: "Sept – Nov 2024",
      tools: ["Figma", "Illustrator", "Mobbin"],
    },
    intro:
      "A promotional site for the Logitech G PRO X Superlight where each section uses a UX law to decide what the shopper should notice next.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of Logitech",
        p: "The project tested whether ==UX laws could shape a product story== from the start, not appear as a justification after the screens were done.",
      },
      {
        title: "What was the outcome?",
        p: "The final prototype used four focused sections, and ==every major layout choice traced back to a named principle==: what to see first, where to click, and how much detail to hold at once.",
      },
      { section: "The brief" },
      {
        title: "The psychology was mapped before the pixels moved.",
        p: "The brief was simple: present a new product so it is easy to understand and remember. My angle was to ==put the psychology on the page== by pairing each law with one concrete interface decision before any pixels moved.",
      },
      {
        media: "wireframe",
        title: "The proposal, on paper.",
        sub: "Every UX law was paired with the concrete interface decision it would drive before a single pixel moved.",
      },
      { section: "The laws" },
      {
        cols: [
          {
            icon: "lawMagnet",
            title: "Spatial contiguity",
            sub: "Specs attach to the product image so the eye does not bounce between two separate explanations.",
          },
          {
            icon: "lawCrosshair",
            title: "Fitts's law",
            sub: "Primary purchase targets stay large and close to the product decision.",
          },
          {
            icon: "lawSeven",
            title: "Miller's law",
            sub: "The software story capped at 5–7 pages.",
          },
        ],
      },
      {
        cols: [
          {
            icon: "lawAsterisk",
            title: "Von Restorff",
            sub: "Contrast makes the 63-gram weight the page's easiest number to remember.",
          },
          {
            icon: "lawDashed",
            title: "Zeigarnik",
            sub: "Progress dots give the page a visible sense of unfinished reading.",
          },
          {
            icon: "lawBookmarks",
            title: "Serial position",
            sub: "Price first, battery life last. Shoppers remember what sits at the start and end of the page.",
          },
        ],
      },
      {
        title: "Tesler's law kept the product story honestly complex.",
        p: "Tesler's law ==kept the honest complexity==. The page could simplify the path, but it could not hide the specifications a serious buyer needs.",
      },
      {
        media: "wireframe",
        title: "Laws, made visible.",
        sub: "Each principle lands on a specific part of the page: product specs, target sizing, progress, contrast, and content order.",
      },
      { section: "The site" },
      {
        media: "image",
        title: "Four sections, one path.",
        sub: "Home, Features, Software, and Where to Buy lead from product value to G HUB profiles and purchase options.",
      },
      { section: "Retrospective" },
      {
        title: "The laws decided the site instead of decorating it.",
        p: "The useful lesson was not that every UX law needs a section. It was that each law can force a decision. ==The laws did not decorate the site; they decided it==.",
      },
      {
        media: "wireframe",
        title: "The finished landing.",
        sub: "The hero brings together the 63-gram weight, HERO 25K sensor, and a purchase action within easy reach.",
      },
    ],
  },
  kinetix: {
    title: "Kinetix",
    meta: "Synthetic UX Testing",
    hero: "prototype",
    cover: kinetixCover,
    coverAlt: "Kinetix synthetic UX testing dashboard cover",
    /* Work in progress — listed but locked (no open, no deep-link). */
    wip: true,
    facts: {
      role: "Interface design",
      team: "Solo",
      duration: "2026",
      tools: ["React", "Motion", "Vite"],
    },
    intro:
      "Kinetix is a synthetic UX testing concept that pressure-tests a checkout, explains where it breaks, and turns findings into interface decisions.",
    blocks: [
      { section: "Overview" },
      {
        title: "The gist of Kinetix",
        p: "Kinetix asks a practical question: what if a team could ==test a design at scale before a real user touches it==, then see the findings as design work instead of analytics noise?",
      },
      {
        title: "What was the outcome?",
        p: "The result was a working dashboard concept that keeps heatmaps, friction scores, accessibility issues, and conversion risks ==calm enough to act on==.",
      },
      { section: "The concept" },
      {
        media: "prototype",
        title: "A checkout, scored.",
        sub: "The test view centers on one checkout: friction score 82, conversion risk at step three, heatmaps, and an accessibility queue written like findings from a teammate.",
      },
      {
        title: "The interface had to translate evidence into instructions.",
        p: "A high score by itself is trivia. The useful moment is the handoff from pattern to action: ==move the CTA, raise contrast, reorder a form, retest the step==.",
      },
      {
        cols: [
          {
            title: "Behavior signal",
            sub: "Synthetic sessions cluster hesitation, rage clicks, dead zones, and skipped fields into one friction read.",
          },
          {
            title: "Accessibility signal",
            sub: "Contrast misses, tap-target issues, and form labeling problems sit in the same queue as conversion risk.",
          },
        ],
      },
      {
        title: "The dashboard had to be opinionated without becoming loud.",
        p: "The dashboard avoids a wall of charts by leading with ==specifics, not dashboards==: move the CTA above the thumb zone, raise contrast from 2.8:1 to 5.1:1, reorder the form, then test again.",
      },
      {
        media: "wireframe",
        title: "Findings become a work queue.",
        sub: "Each recommendation pairs the problem with the evidence that produced it, so the designer can see why the next interface change matters.",
      },
    ],
  },
};

/* Work list order — newest project window first (current WIP at top). */
const CASE_STUDY_ORDER = [
  "kinetix",
  "avance",
  "incity",
  "logitech",
  "siren",
  "resolutions",
];

export const site = {
  name: "Wineury Almonte",
  role: "Independent Product Designer",
  /* Header bio — single ~2-line block at 576px (Figma excerpt rhythm). */
  excerpt: [
    "I'm an independent product designer based in Atlanta. I'm currently exploring passion projects, sharpening my eye for interfaces, and experimenting with new design tools.",
  ],
  email: "contact@wineury.design",
  contact: [
    { type: "email", label: "Email", value: "contact@wineury.design" },
    {
      type: "link",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/wineury",
    },
    { type: "link", label: "X", href: "https://x.com/wineurya" },
  ],

  /* Right-side metas: a 2–3 word Title Case tag for what each project does.
     Rows open the in-app case study at /work/<slug> (see CaseStudy). */
  work: CASE_STUDY_ORDER.map((slug) => {
    const study = caseStudies[slug];
    return {
      label: study.title,
      meta: study.meta,
      href: `/work/${slug}`,
      slug,
      /* WIP rows stay listed but locked: no open, no deep-link (see WorkProjects
         and studyFromPath). */
      wip: study.wip ?? false,
      /* Hero kind drives the card media placeholder label in the gallery views;
         cover, when present, fills that media tile with the real project art. */
      hero: study.hero,
      cover: study.cover,
    };
  }),

  /* Live embeds from /exploration — preview key maps to ExplorationGrid components. */
  explorationPreviews: [
    {
      label: "Jelly Volume Slider",
      meta: "Elastic controls",
      href: "/exploration/jelly-scrubber",
      preview: "jelly",
    },
    {
      label: "Wallet Menu",
      meta: "Progressive disclosure",
      href: "/exploration/wallet-menu",
      preview: "wallet",
      previewProps: { defaultOpen: true },
    },
  ],

  /* Explorations that need motion or full bleed to land — kept as plain links. */
  explorationMore: [
    { label: "More exploration", meta: "View all", href: "/exploration" },
  ],

  /* Tool mentions ({ tool, icon }) render with an inline Central brand mark.
     Hover-word photos carry a short `cap` shown centered on hover in the
     expanded bento (alt stays the long, descriptive text). */
  about: [
    "I'm a 23-year-old product designer and researcher based in Atlanta.",
    [
      "I'm drawn to tools that change what's possible, whether that's ",
      { tool: "Figma", icon: "figma" },
      ", ",
      { tool: "Framer", icon: "framer" },
      ", ",
      { tool: "Rive", icon: "rive" },
      ", or whatever I haven't tried yet. The current stack is ",
      { tool: "Claude", icon: "claude" },
      ", ",
      { tool: "Cursor", icon: "cursor" },
      " & ",
      { tool: "Firebase", icon: "firebase" },
      ".",
    ],
    "I started in mobile UX and behavioral tracking. I think in systems: what stays coherent as a product grows, where the smallest decision carries the most weight, and what makes an interface feel like it was always supposed to be that way.",
    "I'm open to founding or early product design roles. Work that's still close to the core decisions and has room to shape what the product becomes.",
    [
      "Off the clock, I'm a devoted ",
      {
        word: "foodie",
        photos: [
          { src: foodFriedChicken, alt: "A tray of Korean fried chicken", cap: "korean fried chicken run" },
          { src: foodIzakaya, alt: "An izakaya spread of small plates", cap: "izakaya, little plates" },
          { src: foodBirria, alt: "Birria tacos with a cup of consommé", cap: "birria, extra consommé" },
        ],
      },
      ", usually planning my next ",
      {
        word: "trip home",
        photos: [
          { src: travelBeach, alt: "Palm trees over a Caribbean beach", cap: "home beach, no filter" },
          { src: travelDrStreet, alt: "A sunny street in the Dominican Republic", cap: "DR streets, golden hour" },
          { src: travelBallpark, alt: "A winter-league baseball game at night", cap: "winter league nights" },
        ],
      },
      " to the Dominican Republic, getting a session in at ",
      {
        word: "the gym",
        photos: [
          { src: gymSelfie, alt: "Post-workout selfie outdoors", cap: "post-pump glow" },
          { src: gymMirror, alt: "Gym mirror selfie in the locker room", cap: "locker room check-in" },
        ],
      },
      ", digging through ",
      {
        word: "vinyl",
        photos: [
          { src: vinylOxymoron, alt: "ScHoolboy Q's Oxymoron on vinyl, found in the wild", cap: "oxymoron, found in the wild" },
        ],
      },
      " bins, or hanging out with ",
      {
        word: "my family's dogs",
        photos: [
          { src: dogSpaniel, alt: "A Cavalier King Charles spaniel looking up", cap: "the gentleman" },
          { src: dogPoodle, alt: "A curly toy poodle standing on a wood floor", cap: "the menace" },
        ],
      },
      ". The ",
      {
        word: "Miles Morales",
        photos: [{ src: milesPlush, alt: "A Miles Morales Spider-Man plush", cap: "the plush stays" }],
      },
      " plush is non-negotiable.",
    ],
  ],
};

export const tabs = [
  { id: "work", label: "Work", icon: "work" },
  { id: "exploration", label: "Exploration", icon: "exploration" },
  { id: "about", label: "About", icon: "about" },
];
