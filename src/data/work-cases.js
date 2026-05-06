/**
 * Image-led case study templates (partnered with Figma Design-Exploration nodes:
 * 159:93 hero+visual, 159:849 stepped list, 159:1099 narrow editorial stack).
 * Copy is minimal on purpose; swap URLs as projects ship.
 */
import {
  SITE_EXTRA_IMAGES,
  SITE_IMAGE_FALLBACKS,
  SITE_WORK,
} from "@/exploration/siteContent.js";

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
      toolLabels: ["Figma", "After Effects"],
    },
    /**
     * Long-form chapters. ScrollTrigger spy in `useCaseStudyScrollSpy` updates the
     * left aside (eyebrow / title / lede) as each section enters viewport center.
     * Body copy is intentionally minimal lorem per repo policy — replace as content lands.
     */
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
    lede: "All-in-one access to city services, updates, and support — with a calmer first screen and prompts for city problems, status, and reporting (Figma 458:10858).",
    heroImage: "/work/incity-hero.png",
    backLabel: "Index",
  },
  siren: {
    template: "steps",
    title: "Siren",
    kicker: "Safety · Product",
    lede: "From trust signals to verification — a stepped look at the flow, not a wall of text.",
    backLabel: "Index",
    steps: [
      {
        title: "Map the risk",
        blurb: "Where trust breaks first in the journey.",
        image: SITE_EXTRA_IMAGES.aurora,
      },
      {
        title: "Test the guardrails",
        blurb: "Sprint-shaped usability passes on the uncomfortable paths.",
        image: SITE_EXTRA_IMAGES.studioDesk,
      },
      {
        title: "Ship the calm",
        blurb: "A UI that signals safety without shouting.",
        image: SITE_IMAGE_FALLBACKS.heroOcean,
      },
    ],
  },
  resolutions: {
    template: "editorial",
    title: "Resolutions",
    kicker: "Product · Habit",
    lede: "A scroll-first pass: rhythm, stills, and space — the copy stays out of the way.",
    backLabel: "Index",
    strips: [
      { caption: "Onboarding", image: SITE_EXTRA_IMAGES.typography },
      { caption: "Routines", image: SITE_EXTRA_IMAGES.workshop },
      { caption: "Progress", image: SITE_EXTRA_IMAGES.gradient },
      { caption: "Return", image: SITE_EXTRA_IMAGES.marble },
    ],
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
