/**
 * Image-led case study templates (partnered with Figma Design-Exploration nodes:
 * 159:93 hero+visual, 159:849 stepped list, 159:1099 narrow editorial stack).
 * Copy is minimal on purpose; swap URLs as projects ship.
 */
import { SITE_EXTRA_IMAGES, SITE_WORK } from "@/exploration/siteContent.js";

const INCITY_ABOUT_PARAGRAPHS = [
  "ATL311 was Atlanta's go-to channel for non-emergency reports, but too many tickets stalled. Reports went unfinished, forgotten, or closed without a real fix.",
  "InCity rebuilds that flow with live city updates, map context, and case tracking from first report to resolution.",
];

const INCITY_OUTCOME_PARAGRAPHS = [
  "Task completion ran about 75% faster, errors dropped from roughly 30% to 5%, and abandoned submissions stopped showing up.",
];

/** @type {Record<string, { template: 'hero' | 'steps' | 'editorial'; title: string; kicker: string; lede: string; heroImage?: string; backLabel?: string; steps?: { title: string; blurb: string; image: string }[]; strips?: { caption: string; image: string }[] }>} */
export const WORK_CASE_PAGES = {
  avance: {
    template: "hero",
    title: "Avance",
    kicker: "Coaching · Mobile",
    lede: "Mobile coaching for goals you can say out loud.",
    heroImage: "/work/avance-hero.png",
    backLabel: "Index",
    editorialMeta: {
      industry: "Coaching · Consumer mobile",
      aboutParagraphs: [
        "Most goal apps lean on streaks. When the streak breaks, the app stops getting opened.",
        "Avance pairs the goal with a real plan, real dates, and a coach who checks in when progress slows. Closer to working with a person than running a timer.",
      ],
      team: "Solo concept",
      duration: "Mar 2025 – May 2025",
      toolLabels: ["Figma", "After Effects", "Claude", "Cursor", "Firebase"],
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
    lede: "Mobile-first civic reporting for Atlanta. Shorter paths to submit, clearer status, and case tracking that holds the line until resolution.",
    heroImage: "/work/incity-hero.png",
    backLabel: "Index",
    editorialMeta: {
      industry: "Civic tech · Government services",
      aboutParagraphs: INCITY_ABOUT_PARAGRAPHS,
      outcomeParagraphs: INCITY_OUTCOME_PARAGRAPHS,
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
    lede: "Trust signals and verification, walked one step at a time so the safety story reads clearly without a wall of text.",
    backLabel: "Index",
    editorialMeta: {
      industry: "Safety · Product",
      aboutParagraphs: [
        "Siren is a trust-and-safety surface for products where users sign up on uncomfortable terms. Most safety UI defaults to interrogation, which loses people early.",
        "The work focuses on verification flows that read calm, and guardrails that catch the wrong action before it ships.",
      ],
      team: "Solo concept",
      duration: "2024",
      toolLabels: ["Trust & Safety", "Interaction", "Usability"],
    },
  },
  resolutions: {
    template: "editorial",
    title: "Resolutions",
    kicker: "Product · Habit",
    lede: "An editorial pass on a habit product. Rhythm and stills carry the story so the copy can stay out of the way.",
    backLabel: "Index",
    editorialMeta: {
      industry: "Product · Habit",
      aboutParagraphs: [
        "Most habit apps front-load checklists and streaks before the user has a reason to care.",
        "Resolutions takes a scroll-first pass: each stage maps to a real moment in the user's week, not a screen tour, and pacing carries the weight before features do.",
      ],
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
