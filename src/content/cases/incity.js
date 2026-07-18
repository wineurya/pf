/* Case study: incity */

import incityCover from "../../assets/case/incity-cover.webp";
import incityCoverDark from "../../assets/case/incity-cover-dark.webp";
import incityOldFlowWebm from "../../assets/case/incity-old-flow.webm";
import incityOldFlowMp4 from "../../assets/case/incity-old-flow.mp4";
import incityOldFlowPoster from "../../assets/case/incity-old-flow-poster.jpg";
import incityResearchInterviews from "../../assets/case/incity-research-interviews.webp";
import incityResearchAudit from "../../assets/case/incity-research-audit.webp";
import incityResearchLitReview from "../../assets/case/incity-research-litreview.webp";
import incityWireframesLowFi from "../../assets/case/incity-wireframes-lowfi.webp";
import incityFeatureDesignSystem from "../../assets/case/incity-feature-designsystem.webp";
import incityFeatureTypeIconography from "../../assets/case/incity-feature-type-iconography.webp";
import incityFeatureProof from "../../assets/case/incity-feature-proof.webp";
import incityThemeWebm from "../../assets/case/incity-theme.webm";
import incityThemeMp4 from "../../assets/case/incity-theme.mp4";
import incityThemePoster from "../../assets/case/incity-theme-poster.jpg";
import incityMapWebm from "../../assets/case/incity-map.webm";
import incityMapMp4 from "../../assets/case/incity-map.mp4";
import incityMapPoster from "../../assets/case/incity-map-poster.jpg";
import incityResearchWebm from "../../assets/case/incity-research.webm";
import incityResearchMp4 from "../../assets/case/incity-research.mp4";
import incityResearchPoster from "../../assets/case/incity-research-poster.jpg";
import incityPersonaAlex from "../../assets/case/incity-persona-alex.webp";
import incityPersonaBlake from "../../assets/case/incity-persona-blake.webp";

export const incity = {
    title: "InCity",
    meta: "Civic Reporting",
    hero: "video",
    cover: incityCover,
    /* Theme-matched export of the same Figma layer with its dark variable mode
       applied; the light `cover` stays the canonical asset (dims, fallbacks). */
    coverDark: incityCoverDark,
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
        p: "ATL311 made a small civic action feel like paperwork. InCity rebuilt the path around ==a shorter flow, clear city updates, and case tracking==.",
      },
      {
        title: "What was the outcome?",
        p: "In prototype testing, task completion got ==75% faster==, errors fell from ==30% to 5%==, and ==abandoned submissions disappeared==. The concept earned recognition from Kennesaw's Assistant City Manager.",
      },
      { section: "The problem" },
      {
        title: "ATL311 buried a simple report inside a desktop workflow.",
        p: "The existing flow made mobile users fight tiny controls, hidden menus, and unclear status. For a pothole, a broken light, or a blocked sidewalk, that was enough for residents to ==abandon the report==.",
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
        sub: "Four Atlanta residents and two city officials, including Marty Hughes, Assistant City Manager of Kennesaw, described how people experience 311 and what mobile should fix. A competitive audit and a literature review backed the interviews.",
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
        sub: "Interview notes, the audit, and the literature review merged into an affinity map. Its recurring patterns shaped every later decision.",
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
            bio: "Alex lives in Kennesaw, GA, and runs his day from his phone: traffic alerts, events, errands. When he reports an issue, he wants ==instant confirmation==, high contrast, and interactions smooth enough to trust.",
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
            bio: "Blake handles hundreds of 311 requests a week for the city. She needs a ==centralized mobile dashboard==: route issues in one swipe, track responses in real time, spot critical cases fast. Visibility is the difference between smooth operations and a clogged queue.",
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
        alt: "Low-fidelity wireframe board with the full screen set laid out",
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
        p: "High fidelity turned the redesign into a working product. Each feature closes a gap ATL311 left open, across Visual identity, Accessibility, and Interaction.",
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
        alt: "InCity design system: color, type, and component tokens",
      },
      {
        feat: true,
        icon: "grid",
        title: "Type & iconography",
        sub: "Clean type paired with purposeful icons that scale together, so nothing falls out of rhythm.",
        media: "image",
        src: incityFeatureTypeIconography,
        alt: "InCity type scale and icon set",
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
        sub: "Every submission lands somewhere you can see it: a confirmation, a tracked case, a receipt when you pay. ==No guessing whether it went through==.",
        media: "image",
        frameBg: "#000000",
        src: incityFeatureProof,
        alt: "Submission confirmation screen with case details reading You're all set",
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
        p: "The redesign earned ==recognition from Kennesaw's Assistant City Manager==, who praised its potential impact. The strongest shift was emotional: the city finally answers back.",
      },
    ],
  };
