/**
 * Image-led case study templates (partnered with Figma Design-Exploration nodes:
 * 159:93 hero+visual, 159:849 stepped list, 159:1099 narrow editorial stack).
 * Copy is minimal on purpose; swap URLs as projects ship.
 */
import { SITE_EXTRA_IMAGES, SITE_WORK } from "@/exploration/siteContent.js";

const INCITY_ABOUT_PARAGRAPHS = [
  "Plagued with issues, ATL311 was the system Atlanta residents relied on to report non-emergency problems. Too many reports were forgotten, left incomplete, or closed without a real fix.",
  "InCity targets those failures—with city updates, interactive map points, and case tracking that keeps people informed from report to resolution.",
];

/** @type {Record<string, { template: 'hero' | 'steps' | 'editorial'; title: string; kicker: string; lede: string; heroImage?: string; backLabel?: string; steps?: { title: string; blurb: string; image: string }[]; strips?: { caption: string; image: string }[] }>} */
export const WORK_CASE_PAGES = {
  avance: {
    template: "hero",
    title: "Avance",
    kicker: "Coaching · Mobile",
    lede: "Plain-language goals become a plan, a deadline, and a coach in your corner when the search goes quiet or progress slows.",
    heroImage: "/work/avance-hero.png",
    backLabel: "Index",
    editorialMeta: {
      industry: "Coaching · Consumer mobile",
      about:
        "Avance is a coach-shaped mobile flow: plain-language goals, a visible plan and deadline, and coaching prompts when momentum stalls — without the weight of a traditional LMS.",
      team: "Solo concept",
      duration: "Mar 2025 – May 2025",
      toolLabels: ["Figma", "After Effects", "Motion Design"],
    },
    /** Chapter defs remain available for templates/export; aside navigation rail removed. */
    chapters: [
      {
        id: "ch-overview",
        eyebrow: "Avance — overview",
        title: "Coaching that meets you where momentum stops.",
        lede: "Plain-language goals become a plan, a deadline, and a coach in your corner — without the demo-day overhead.",
        bodyParts: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a turpis vehicula, hendrerit risus quis, dictum lectus.",
          "Praesent fringilla, justo a tincidunt convallis, sapien dolor cursus magna, vitae viverra magna massa nec libero.",
        ],
        image: "/work/avance-hero.png",
        imageAlt: "Avance app — goal capture and plan summary",
      },
      {
        id: "ch-discovery",
        eyebrow: "01 — Discovery",
        title: "Where the week stops holding.",
        lede: "Interviews, ride-alongs, and quiet observation. The pattern shows up in plain language, not in analytics.",
        bodyParts: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus, mauris vel ultricies aliquam.",
          "Maecenas faucibus, urna eu fringilla bibendum, sapien magna placerat odio, in tristique nibh est non lectus.",
        ],
        image: SITE_EXTRA_IMAGES.studioDesk,
        imageAlt: "Discovery — research artifacts on a studio desk",
      },
      {
        id: "ch-craft",
        eyebrow: "02 — Craft",
        title: "Plain language. Then a real plan.",
        lede: "From flow to ship: small stages, real coaches, and copy that names what happens next.",
        bodyParts: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget velit at urna luctus aliquet.",
          "Suspendisse potenti. Etiam vitae enim sed sapien condimentum sodales, vitae rutrum lectus volutpat.",
        ],
        image: SITE_EXTRA_IMAGES.typography,
        imageAlt: "Craft — content stage and typographic system",
      },
      {
        id: "ch-outcome",
        eyebrow: "03 — Outcome",
        title: "Said once. The week holds the line.",
        lede: "Coaching that doesn't shout — it shows up when the search goes quiet and the plan is at risk.",
        bodyParts: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Curabitur scelerisque vehicula nibh.",
          "Integer nec dui sed odio luctus volutpat. Nam vitae justo eget magna fermentum iaculis eu non.",
        ],
        image: SITE_EXTRA_IMAGES.workshop,
        imageAlt: "Outcome — coaching artifacts in a workshop",
      },
    ],
  },
  incity: {
    template: "hero",
    title: "InCity",
    kicker: "Civic · Mobile",
    lede: "Mobile-first civic reporting for Atlanta—shorter paths to submit, understandable status, and case tracking so residents complete what they start instead of abandoning it mid-flow.",
    heroImage: "/work/incity-hero.png",
    backLabel: "Index",
    editorialMeta: {
      industry: "Civic tech · Government services",
      aboutParagraphs: INCITY_ABOUT_PARAGRAPHS,
      outcome:
        "Task completion time dropped by about 75%, error rate fell from roughly 30% to near 5%, and abandoned submissions were eliminated. The work was also recognized by the Assistant City Manager of Kennesaw, who noted the impact if the system were implemented.",
      team: "6 people",
      duration: "Feb 2025 – Apr 2025",
      toolLabels: ["Figma", "FigJam", "Lottie", "Adobe After Effects", "Adobe Illustrator"],
      highlightLabels: [
        "Wireframing",
        "Prototyping",
        "Literature review",
        "Competitive auditing",
        "Motion",
      ],
    },
  },
  siren: {
    template: "steps",
    title: "Siren",
    kicker: "Safety · Product",
    lede: "From trust signals to verification — a stepped look at the flow, not a wall of text.",
    backLabel: "Index",
    editorialMeta: {
      industry: "Safety · Product",
      about:
        "Siren is a trust-and-safety surface for products where users sign on uncomfortable terms. The work focuses on verification flows that read calm, not interrogative — and on guardrails that catch the wrong action before it ships.",
      team: "Solo concept",
      duration: "2024",
      toolLabels: ["Trust & Safety", "Interaction", "Usability"],
    },
  },
  resolutions: {
    template: "editorial",
    title: "Resolutions",
    kicker: "Product · Habit",
    lede: "A scroll-first pass: rhythm, stills, and space — the copy stays out of the way.",
    backLabel: "Index",
    editorialMeta: {
      industry: "Product · Habit",
      about:
        "Resolutions is an editorial pass on a habit product — pacing, stills, and stage rather than a feature dump. Each stage maps to a real user moment instead of a screen tour.",
      team: "Solo concept",
      duration: "2023",
      toolLabels: ["Editorial", "Motion", "Brand"],
    },
  },
};

export function getWorkCasePageContext(slug) {
  if (!slug) return null;
  const def = WORK_CASE_PAGES[slug];
  if (!def) return null;
  const gridEntry = SITE_WORK.find((e) => e.slug === slug) ?? null;
  return { def, gridEntry };
}

export function getWorkCaseOrNull(slug) {
  return slug ? WORK_CASE_PAGES[slug] ?? null : null;
}
