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
import paniTest from "./assets/exploration/pani-test.webp";

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
import incityFeatureTypeIconography from "./assets/case/incity-feature-type-iconography.webp";
import incityFeatureProof from "./assets/case/incity-feature-proof.webp";

/* InCity "Changeable theme" feature recording — light/dark toggle demo on the
   hi-fi home screen (square render, full-bleed on the feature card). */
import incityThemeWebm from "./assets/case/incity-theme.webm";
import incityThemeMp4 from "./assets/case/incity-theme.mp4";
import incityThemePoster from "./assets/case/incity-theme-poster.jpg";

/* InCity "Interactive map" feature recording — the hi-fi prototype's map screen
   (phone-framed, square render). Compressed to WebM (VP9) + mp4 (H.264) with a
   poster; plays inline on the feature card, reduced motion → poster. */
import incityMapWebm from "./assets/case/incity-map.webm";
import incityMapMp4 from "./assets/case/incity-map.mp4";
import incityMapPoster from "./assets/case/incity-map-poster.jpg";

/* InCity research synthesis — a pan across the affinity-mapping board (interview
   findings grouped into patterns). Same WebM/mp4/poster treatment as the map. */
import incityResearchWebm from "./assets/case/incity-research.webm";
import incityResearchMp4 from "./assets/case/incity-research.mp4";
import incityResearchPoster from "./assets/case/incity-research-poster.jpg";

/* InCity personas — Alex ykax52, Blake fSpKPcvg (wineury.design). */
import incityPersonaAlex from "./assets/case/incity-persona-alex.webp";
import incityPersonaBlake from "./assets/case/incity-persona-blake.webp";

/* Siren case-study stills from wineury.design/cases/siren (converted to WebP). */
import sirenLeanUxCanvas from "./assets/case/siren-lean-ux-canvas.webp";
import sirenPersonaAubrey from "./assets/case/siren-persona-aubrey.webp";
import sirenPersonaAubreyJpg from "./assets/case/siren-persona-aubrey.jpg";
import sirenHypothesisMatrix from "./assets/case/siren-hypothesis-matrix.webp";
import sirenSprint1Flags from "./assets/case/siren-sprint1-flags.webp";
import sirenSprint2VideoCall from "./assets/case/siren-sprint2-video-call.webp";
import sirenCatfishTesting from "./assets/case/siren-catfish-testing.webp";
import sirenHifiPass from "./assets/case/siren-hifi-pass.webp";

/* Logitech stills from wineury.design/cases/logitech — the annotated UX-law
   slides (one per principle, fed to the laws slider), the project proposal,
   and the finished pages. */
import logitechProposal from "./assets/case/logitech-proposal.webp";
import logitechLawContiguity from "./assets/case/logitech-law-contiguity.webp";
import logitechLawFitts from "./assets/case/logitech-law-fitts.webp";
import logitechLawMiller from "./assets/case/logitech-law-miller.webp";
import logitechLawRestorff from "./assets/case/logitech-law-restorff.webp";
import logitechLawZeigarnik from "./assets/case/logitech-law-zeigarnik.webp";
import logitechLawSerial from "./assets/case/logitech-law-serial.webp";
import logitechHomeLaptop from "./assets/case/logitech-home-laptop.webp";
import logitechLanding from "./assets/case/logitech-landing.webp";

/* Resolutions stills from wineury.design/cases/resolutions — vision slide,
   research wall, Tia (persona photo cropped from her card, jpg fallback like
   Siren's Aubrey), hand-drawn sketches, and the hi-fi day-in-the-app lineup. */
import resolutionsVision from "./assets/case/resolutions-vision.webp";
import resolutionsResearchLitReview from "./assets/case/resolutions-research-litreview.webp";
import resolutionsResearchAudit from "./assets/case/resolutions-research-audit.webp";
import resolutionsResearchInterview from "./assets/case/resolutions-research-interview.webp";
import resolutionsPersonaTia from "./assets/case/resolutions-persona-tia.webp";
import resolutionsPersonaTiaJpg from "./assets/case/resolutions-persona-tia.jpg";
import resolutionsSketchPlanner from "./assets/case/resolutions-sketch-planner.webp";
import resolutionsSketchTracker from "./assets/case/resolutions-sketch-tracker.webp";
import resolutionsSketchCommunity from "./assets/case/resolutions-sketch-community.webp";
import resolutionsHifiDay from "./assets/case/resolutions-hifi-day.webp";

/* Case studies, keyed by slug; the Work list uses CASE_STUDY_ORDER so row labels
   and page titles stay in sync.

   `facts` is { role, team, duration, tools }; tools render as an icon-only array.
   `blocks` carry the body in a few low-fi layouts: { p } paragraph,
   { media, title, sub } full-width tile — a placeholder unless it carries a real
   asset: `src` (+ `alt`, `portrait` for a phone screen, `compact` for a doc still,
   `bare` to drop the edge ring) renders the image at its own ratio, or
   `media: "phone-video"` + `video` renders a framed recording;
   { mosaic: [{ src, alt }], title?, sub? } a staggered image collage,
   { slider: [{ src, alt, law, text }], title?, sub? } an arrows-and-dots slider
   stepping one annotated slide at a time (Logitech's UX laws),
   { personas: [{ id, name, tagline, image, alt, bio, quirks }] } photo + bio +
   icon list (InCity Alex/Blake, Siren Aubrey); toggle when 2+ personas,
   { cols: [{ title, sub, media?, src? }] } 2- or 3-up cells,
   { feat, title, sub, media, src?, alt?, portrait?, frameBg?, fullBleed? } a
   Features-section card — frames are 1:1; padded media inset by --space-6 unless
   fullBleed (e.g. theme toggle video); frameBg letterboxes contain-fit assets, and
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
            icon: "handTap",
          },
          {
            title: "Buried workflows",
            sub: "Eight steps to submit a single report.",
            icon: "steps",
          },
          {
            title: "Opaque status",
            sub: "After you submit, there is no indication that the city saw it.",
            icon: "question",
          },
        ],
      },
      { section: "Research" },
      {
        media: "image",
        src: incityResearchInterviews,
        alt: "Remote interview session with an Atlanta resident",
        title: "Research started with real voices.",
        sub: "Four Atlanta residents and two city officials, including Marty Hughes, Assistant City Manager of Kennesaw, described how people experience 311 and how they would improve it on mobile — backed by a competitive audit and a literature review.",
      },
      {
        media: "image",
        src: incityResearchAudit,
        alt: "Competitive audit comparing NYC311, Austin311, and CHI311",
        bare: true,
        title: "Atlanta was falling behind cities that made status visible.",
        sub: "A competitive audit of NYC311, Austin311, and CHI311 made the gap concrete. Other cities gave residents ==clean layouts, real-time maps, and bookmarking==; Atlanta left them hunting for the next step.",
      },
      {
        media: "image",
        src: incityResearchLitReview,
        alt: "Literature review notes on civic accessibility",
        bare: true,
        title: "Accessibility meant removing everyday barriers.",
        sub: "The literature review widened the brief. Accessibility was not a compliance checkbox; it was the work of ==removing everyday barriers== so more residents could take part in city upkeep.",
      },
      {
        media: "video",
        video: {
          webm: incityResearchWebm,
          mp4: incityResearchMp4,
          poster: incityResearchPoster,
        },
        title: "From voices to patterns.",
        sub: "Interview notes, the competitive audit, and the literature review were grouped into an affinity map — the recurring patterns that shaped every later decision.",
      },
      {
        cols: [
          {
            title: "Reliable alerts",
            sub: "Residents still lean on local news and TV, so push alerts for weather, traffic, and events had to be dependable.",
            icon: "alerts",
          },
          {
            title: "Payments that work",
            sub: "Digital payments worked half the time; permits and applications still forced in-person trips.",
            icon: "payment",
          },
          {
            title: "Privacy first",
            sub: "Security concerns, especially among older users, called for transparent, trustworthy flows.",
            icon: "privacy",
          },
        ],
      },
      { section: "Personas" },
      {
        title: "Meet Alex and Blake.",
        p: "You've probably met them before. Neighbors with busy lives, staff with endless requests. Alex shaped simpler reporting and instant confirmation. Blake shaped routing, prioritization, and tracking.",
      },
      {
        personas: [
          {
            id: "alex",
            name: "Alex",
            tagline: "The Everyday Resident",
            image: incityPersonaAlex,
            alt: "Alex, an everyday Kennesaw resident",
            bio: "Alex lives in Kennesaw, GA, and relies heavily on his smartphone for traffic alerts, event planning, and day-to-day tasks. He values ==instant confirmation== when reporting an issue, prefers a high-contrast interface that's easy on the eyes, and appreciates engaging micro-interactions that make the process feel smooth and trustworthy.",
            quirks: [
              {
                icon: "tinyControls",
                title: "Tiny controls, giant headache.",
                text: "Alex struggles with buttons and menus that are too small or hidden, making it frustrating to file a report.",
              },
              {
                icon: "onTheGo",
                title: "Hard to use while on the go.",
                text: "Reporting on the go is difficult without a clean, mobile-friendly interface, especially during commutes.",
              },
              {
                icon: "noFeedback",
                title: "Not a clue if anything's happening.",
                text: "After submitting, Alex often gets no clear feedback, leaving him unsure if the city even saw his request.",
              },
            ],
          },
          {
            id: "blake",
            name: "Blake",
            tagline: "The Overloaded Staffer",
            image: incityPersonaBlake,
            alt: "Blake, a city 311 staff member",
            bio: "Blake manages hundreds of 311 requests every week as part of her city staff role. She needs a ==centralized mobile dashboard== to route issues in one swipe, track departmental responses in real time, and quickly identify critical cases through upvotes and alerts. For Blake, efficiency and visibility are the difference between smooth operations and a clogged workflow.",
            quirks: [
              {
                icon: "misrouted",
                title: "Requests always land in the wrong place.",
                text: "Blake wastes time rerouting misdirected cases instead of resolving them.",
              },
              {
                icon: "noPriority",
                title: "No way to tell what's urgent.",
                text: "Without prioritization, Blake has to guess which requests need immediate attention, slowing critical responses.",
              },
              {
                icon: "inboxJam",
                title: "Inbox looks like a traffic jam.",
                text: "Hundreds of unorganized requests pile up, leaving Blake with an overwhelming workload that's hard to track.",
              },
            ],
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
        title: "Five features carried the high-fidelity experience.",
        p: "High fidelity turned the redesign into a working product. Each feature closes a specific gap the original ATL311 left open, spanning Visual identity, Accessibility, and Interaction from first tap to final confirmation.",
        guide: [
          { term: "Visual identity", count: 2, icon: "visual" },
          { term: "Accessibility", count: 1, icon: "access" },
          { term: "Interaction", count: 2, icon: "interaction" },
        ],
      },
      {
        feat: true,
        icon: "palette",
        title: "Changeable theme",
        sub: "The interface changes with you: bright for clarity outdoors and dark for comfort at night.",
        media: "prototype",
        fullBleed: true,
        video: {
          webm: incityThemeWebm,
          mp4: incityThemeMp4,
          poster: incityThemePoster,
        },
      },
      {
        feat: true,
        icon: "layers",
        title: "Design system",
        sub: "Soft corners, crisp feedback, and playful touches like bouncing pins. Every tap feels predictable and alive.",
        media: "image",
        src: incityFeatureDesignSystem,
        alt: "InCity design system — color, type, and component tokens",
      },
      {
        feat: true,
        icon: "grid",
        title: "Type & iconography",
        sub: "Clean type paired with purposeful icons that scale together, so nothing falls out of rhythm.",
        media: "image",
        src: incityFeatureTypeIconography,
        alt: "InCity type scale and icon set — typography paired with purposeful icons",
        fullBleed: true,
      },
      {
        feat: true,
        icon: "map",
        title: "Interactive map",
        sub: "The city at your fingertips. Cases appear as dots you can tap to see details, follow their status, and feel the progress in real time.",
        media: "prototype",
        frameBg: "#000000",
        video: {
          webm: incityMapWebm,
          mp4: incityMapMp4,
          poster: incityMapPoster,
        },
      },
      {
        feat: true,
        icon: "clipboard",
        title: "Proof every time",
        sub: "Every submission lands somewhere you can see it — a confirmation, a tracked case, and a receipt when you pay. ==You are never left guessing whether it went through==.",
        media: "image",
        frameBg: "#000000",
        src: incityFeatureProof,
        alt: "Submission confirmation screen with case details — You're all set",
        portrait: true,
      },
      { section: "Outcomes" },
      {
        title: "Testing made the gains real.",
        p: "Prototype testing turned the redesign into measurable evidence.",
      },
      {
        cols: [
          {
            icon: "faster",
            title: "75% faster",
            sub: "Task completion time after iterative testing; the flow went from six steps to three.",
          },
          {
            icon: "errorRate",
            title: "30% → 5%",
            sub: "Error rate, from clearer inputs.",
          },
          {
            icon: "retention",
            title: "Zero drop-offs",
            sub: "Abandoned submissions disappeared entirely.",
          },
        ],
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
        media: "image",
        src: sirenLeanUxCanvas,
        alt: "Lean UX canvas with eight boxes ranking assumptions and hypotheses by risk and value",
        title: "The Lean UX canvas.",
        sub: "Eight boxes of assumptions and hypotheses ranked by risk and value mapped the experiment before a single screen.",
      },
      {
        title: "Meet Aubrey.",
        p: "She stood in for the cautious new user the team designed around. Her needs shaped the two features in the sprint plan.",
      },
      {
        personas: [
          {
            id: "aubrey",
            name: "Aubrey",
            tagline: "Proto-persona, 25",
            image: sirenPersonaAubrey,
            imageFallback: sirenPersonaAubreyJpg,
            alt: "Aubrey with a camera outdoors, wearing an orange hoodie",
            bio: "Busy, cautious, new to dating apps. She wants control over her dating pool without reading every profile like a background check.",
            quirks: [
              {
                icon: "reportCallouts",
                title: "Profile report callouts",
                text: "Green, yellow, and red signals on profiles before a match deepens.",
              },
              {
                icon: "videoCall",
                title: "Required video call",
                text: "After a set number of texts, the app nudges people onto video.",
              },
            ],
          },
        ],
      },
      {
        media: "image",
        src: sirenHypothesisMatrix,
        alt: "Hypothesis prioritization matrix plotting risk versus value",
        title: "Prioritizing hypotheses.",
        sub: "High-risk, high-value ideas went into two sprints: profile callouts and required video calls.",
      },
      { section: "Sprint 1" },
      {
        media: "image",
        src: sirenSprint1Flags,
        alt: "Low-fidelity profile screens with green, yellow, and red report callouts during usability testing",
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
        src: sirenSprint2VideoCall,
        alt: "Low-fidelity chat flow showing a required video call scheduled after the text limit",
        title: "Sprint 2: the required video call.",
        sub: "After the text limit, the app gives people ten messages to plan when they will connect by video.",
      },
      {
        title: "Verification raised trust even when the requirement felt strict.",
        p: "In testing, participants ==spotted the staged catfish during the call==. Trust went up, even though the requirement felt strict. Most accepted the call when the app framed it as a safety net instead of a punishment.",
      },
      {
        media: "image",
        src: sirenCatfishTesting,
        alt: "Catfish testing session with participant photos and chat screenshots from the video call sprint",
        title: "Catfish testing.",
        sub: "Participants spotted the staged catfish during the required video call.",
        bare: true,
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
      {
        media: "image",
        src: sirenHifiPass,
        alt: "High-fidelity Siren screens showing the final reporting flow with clearer flag definitions",
        title: "The high-fidelity pass.",
        sub: "The final reporting flow made flag definitions, disclosure, and the primary action clearer.",
        bare: true,
      },
      { section: "Retrospective" },
      {
        title: "Trust held up; the definition of a red flag did not.",
        p: "The flag system and verification call supported trust and transparency, but the reporting model needed more precision. One question stayed unresolved: ==what exactly qualifies as a red flag==, and who gets to decide?",
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
        media: "image",
        src: resolutionsVision,
        alt: "Vision statement slide asking 'How can I pack my life into one app?' above six circles: planner, sleep, fitness, diet, money, goals",
        title: "One routine, six apps.",
        sub: "Planning, budgeting, and habits lived in separate places. Resolutions set out to fold them into one routine.",
      },
      { section: "Research" },
      {
        title: "People wanted structure, community, and control over reminders.",
        p: "The research loop combined habit-formation literature, a competitive audit, and interviews. Habit tracked behavior but lacked community; Notion organized everything but felt business-first. Jack wanted structure and friendly competition. Kayli wanted smaller tasks and notifications she could shape. ==Both wanted control, not another nagging system==.",
      },
      {
        mosaic: [
          {
            src: resolutionsResearchLitReview,
            alt: "Literature review slide on habit tracking and how successful people reach their goals",
          },
          {
            src: resolutionsResearchAudit,
            alt: "Competitive audit of the Habit app listing pros, cons, and the improvements carried forward",
          },
          {
            src: resolutionsResearchInterview,
            alt: "Interview takeaways from Jack with recommendations on consistency, community, and quieter notifications",
          },
        ],
        title: "The research wall.",
        sub: "Literature notes, the competitive audit, and interview takeaways pinned into one picture of what people actually wanted.",
      },
      { section: "Personas" },
      {
        title: "Meet Tia.",
        p: "Research kept pointing at the same person: a student whose day is already full. Tia became the primary persona, and the product was designed for ==one person checking in once a day== — mobile first, low complexity, calendar-aware.",
      },
      {
        personas: [
          {
            id: "tia",
            name: "Tia",
            tagline: "Primary persona, 22",
            image: resolutionsPersonaTia,
            imageFallback: resolutionsPersonaTiaJpg,
            alt: "Tia in round glasses with long dark hair, lit by warm light against a teal wall",
            bio: "Fourth-year architecture major in Alpharetta, GA — full-time classes, barista shifts, and an internship on top. Her New Year's resolution was a healthier routine; the hard part is fitting it into a day that is already full.",
            quirks: [
              {
                icon: "oneApp",
                title: "One home for everything",
                text: "School, shifts, groceries, water, and a long-term goal — in one place instead of five.",
              },
              {
                icon: "dailyCheck",
                title: "The daily check",
                text: "Small dailies she can clear in one pass: gym, groceries, water, assignments.",
              },
              {
                icon: "bigGoal",
                title: "A goal with a date",
                text: "Graduate, finish the degree, land the architecture job — long arcs behind the daily list.",
              },
            ],
          },
        ],
      },
      { section: "Design" },
      {
        mosaic: [
          {
            src: resolutionsSketchPlanner,
            alt: "Hand-drawn planner and meals screens sketched on paper",
          },
          {
            src: resolutionsSketchTracker,
            alt: "Hand-drawn habit tracker, school, and health screens sketched on paper",
          },
          {
            src: resolutionsSketchCommunity,
            alt: "Hand-drawn profile, groups, and community board sketches",
          },
        ],
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
        media: "image",
        src: resolutionsHifiDay,
        alt: "Five high-fidelity screens in a row: wake-time check-in, profile, meals, daily routines, and the community feed",
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
        media: "image",
        src: logitechProposal,
        alt: "Final project proposal document pairing each UX law with the interface decision it would drive",
        compact: true,
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
        slider: [
          {
            src: logitechLawContiguity,
            alt: "Annotated software page: descriptive text placed directly beside the G HUB visual",
            law: "Spatial contiguity",
            text: "Descriptive text sits right beside the G HUB visual, so software and explanation read as one unit.",
          },
          {
            src: logitechLawFitts,
            alt: "Annotated purchase page: six large Buy Now buttons grouped close together",
            law: "Fitts's law",
            text: "Six large Buy Now targets sit close together, so the purchase click costs no travel.",
          },
          {
            src: logitechLawMiller,
            alt: "Annotated features page: six feature cards listed so users can retain the information",
            law: "Miller's law",
            text: "The features page holds six cards — inside the 5–7 chunks people can actually retain.",
          },
          {
            src: logitechLawRestorff,
            alt: "Annotated feature slide: the 63-gram weight highlighted as the one contrasting number",
            law: "Von Restorff",
            text: "One highlighted number — 63 grams — makes the weight the easiest thing on the page to remember.",
          },
          {
            src: logitechLawZeigarnik,
            alt: "Annotated carousel: header navigation, arrow buttons, and progress dots marked on the features slide",
            law: "Zeigarnik",
            text: "Progress dots under the carousel keep the read visibly unfinished, pulling people to the next slide.",
          },
          {
            src: logitechLawSerial,
            alt: "Closing panel of the landing: headline specs at the top, the Explore purchase card at the end",
            law: "Serial position",
            text: "What sits first and last is chosen: the page leads with the headline specs and closes on where to buy.",
          },
        ],
        title: "Laws, made visible.",
        sub: "Each principle lands on a specific part of the page: product specs, target sizing, progress, contrast, and content order.",
      },
      { section: "The site" },
      {
        media: "image",
        src: logitechHomeLaptop,
        alt: "Laptop mockup of the Superlight G PRO X home page with Home, Features, Software, and Purchase in the nav pill",
        title: "Four sections, one path.",
        sub: "Home, Features, Software, and Where to Buy lead from product value to G HUB profiles and purchase options.",
      },
      { section: "Retrospective" },
      {
        title: "The laws decided the site instead of decorating it.",
        p: "The useful lesson was not that every UX law needs a section. It was that each law can force a decision. ==The laws did not decorate the site; they decided it==.",
      },
      {
        media: "image",
        src: logitechLanding,
        alt: "Finished landing pages: the hero with the Superlight mouse beside the specs panel with weight, sensor, and price",
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
    "Case studies are ::trafficCone==under construction.==",
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

  /* Live embeds — preview key maps to ExplorationGrid components.
     Caption sits inside the frame: label/subtitle top-left, optional note
     top-right. Notes are for what the title can't say (an interaction hint,
     an "inspired by" credit) — never a restatement of the title. */
  explorationPreviews: [
    {
      label: "Assistant status orb",
      subtitle: "State indicator component",
      preview: "thinking",
    },
    {
      label: "Wallet action menu",
      subtitle: "Menu component",
      preview: "wallet",
      previewProps: { defaultOpen: true },
    },
    {
      label: "Crate reorder queue",
      subtitle: "Draggable list component",
      note: "Inspired by @alyx_so",
      noteHref: "https://twitter.com/alyx_so",
      preview: "crate",
    },
    {
      label: "Hold-to-send button",
      subtitle: "Confirmation button component",
      preview: "hold",
    },
    {
      label: "Jelly volume slider",
      subtitle: "Input slider component",
      preview: "jelly",
    },
    {
      label: "Magnetic app dock",
      subtitle: "Navigation dock component",
      preview: "magnetic",
    },
    {
      label: "Notch sidebar",
      subtitle: "Pop-out panel component",
      preview: "notch",
      previewProps: { defaultOpen: true },
    },
    {
      label: "Number counter",
      subtitle: "Data display component",
      preview: "odometer",
    },
    /* shelved — Attention Field (src/exploration/grainGradient/)
    {
      label: "Attention field",
      preview: "grain",
    },
    */
    {
      label: "Lines-changed pulse",
      subtitle: "Version feedback component",
      preview: "diff",
    },
    /* shelved — Fluted Glass (src/exploration/flutedGlass/)
    {
      label: "Fluted glass",
      preview: "glass",
    },
    */
    /* shelved — Voronoi Grid (src/exploration/voronoiGrid/)
    {
      label: "Voronoi grid",
      preview: "voronoi",
    },
    */
    {
      label: "Pani interface card",
      subtitle: "Visual study component",
      image: paniTest,
      imageAlt: "Pani interface study",
    },
  ],

  /* Tool mentions ({ tool, icon }) render with an inline Central brand mark.
     Hover-word photos carry a short `cap` shown centered on hover in the
     expanded bento (alt stays the long, descriptive text). */
  about: [
    "I'm a product designer and researcher based in Atlanta. I started in mobile UX and behavioral tracking, and I care about making interfaces feel clear, useful, and easy to stay with.",
    "I was born in Queens and raised in Atlanta, so a lot of how I think about design comes from watching how people move through real places.",
    [
      { text: "I'm drawn to tools that change what's possible, whether that's ", tone: "muted" },
      { tool: "Figma", icon: "figma" },
      { text: ", ", tone: "muted" },
      { tool: "Framer", icon: "framer" },
      { text: ", ", tone: "muted" },
      { tool: "Rive", icon: "rive" },
      { text: ", or whatever I haven't tried yet. The current stack is ", tone: "muted" },
      { tool: "Claude", icon: "claude" },
      { text: ", ", tone: "muted" },
      { tool: "Cursor", icon: "cursor" },
      { text: " & ", tone: "muted" },
      { tool: "Firebase", icon: "firebase" },
      { text: ".", tone: "muted" },
    ],
    [
      {
        text: "I'm open to founding or early product design roles. Work that's still close to the core decisions and has room to shape what the product becomes.",
        tone: "muted",
      },
    ],
    [
      "When I'm not working, I'm usually thinking about ",
      {
        word: "food",
        photos: [
          { src: foodFriedChicken, alt: "A tray of Korean fried chicken", cap: "korean fried chicken run" },
          { src: foodIzakaya, alt: "An izakaya spread of small plates", cap: "izakaya, little plates" },
          { src: foodBirria, alt: "Birria tacos with a cup of consommé", cap: "birria, extra consommé" },
        ],
      },
      ", wishing I could get back to ",
      {
        word: "my country",
        photos: [
          { src: travelBeach, alt: "Palm trees over a Caribbean beach", cap: "home beach, no filter" },
          { src: travelDrStreet, alt: "A sunny street in the Dominican Republic", cap: "DR streets, golden hour" },
          { src: travelBallpark, alt: "A winter-league baseball game at night", cap: "winter league nights" },
        ],
      },
      " more often, or dragging myself to ",
      {
        word: "the gym",
        photos: [
          { src: gymSelfie, alt: "Post-workout selfie outdoors", cap: "post-pump glow" },
          { src: gymMirror, alt: "Gym mirror selfie in the locker room", cap: "locker room check-in" },
        ],
      },
      ". I dig through ",
      {
        word: "vinyl",
        photos: [
          { src: vinylOxymoron, alt: "ScHoolboy Q's Oxymoron on vinyl, found in the wild", cap: "oxymoron, found in the wild" },
        ],
      },
      " when I find a good bin, hang out with ",
      {
        word: "my family's dogs",
        photos: [
          { src: dogSpaniel, alt: "A Cavalier King Charles spaniel looking up", cap: "the gentleman" },
          { src: dogPoodle, alt: "A curly toy poodle standing on a wood floor", cap: "the menace" },
        ],
      },
      ", and yeah, I'm pretty into ",
      {
        word: "Spider-Man",
        photos: [{ src: milesPlush, alt: "A Spider-Man plush on a shelf", cap: "Spider-Man stays" }],
      },
      ".",
    ],
  ],
};

export const tabs = [
  { id: "work", label: "Work", icon: "work" },
  { id: "exploration", label: "Exploration", icon: "exploration" },
  { id: "about", label: "About", icon: "about" },
];
