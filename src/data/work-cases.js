/**
 * Image-led case study templates (partnered with Figma Design-Exploration nodes:
 * 159:93 hero+visual, 159:849 stepped list, 159:1099 narrow editorial stack).
 * Copy is minimal on purpose; swap URLs as projects ship.
 */
import {
  WINNIE_EXTRA_IMAGES,
  WINNIE_IMAGE_FALLBACKS,
} from "@/exploration/winnie-content.js";

/** @type {Record<string, { template: 'hero' | 'steps' | 'editorial'; title: string; kicker: string; lede: string; heroImage?: string; backLabel?: string; steps?: { title: string; blurb: string; image: string }[]; strips?: { caption: string; image: string }[] }>} */
export const WORK_CASE_PAGES = {
  incity: {
    template: "hero",
    title: "InCity",
    kicker: "Civic · Mobile",
    lede: "A clearer path from report to resolution — designed for the phone in your pocket, not a desktop form.",
    heroImage: WINNIE_IMAGE_FALLBACKS.heroMountain,
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
        image: WINNIE_EXTRA_IMAGES.aurora,
      },
      {
        title: "Test the guardrails",
        blurb: "Sprint-shaped usability passes on the uncomfortable paths.",
        image: WINNIE_EXTRA_IMAGES.studioDesk,
      },
      {
        title: "Ship the calm",
        blurb: "A UI that signals safety without shouting.",
        image: WINNIE_IMAGE_FALLBACKS.heroOcean,
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
      { caption: "Onboarding", image: WINNIE_EXTRA_IMAGES.typography },
      { caption: "Routines", image: WINNIE_EXTRA_IMAGES.workshop },
      { caption: "Progress", image: WINNIE_EXTRA_IMAGES.gradient },
      { caption: "Return", image: WINNIE_EXTRA_IMAGES.marble },
    ],
  },
};

export function getWorkCaseOrNull(slug) {
  return WORK_CASE_PAGES[slug] ?? null;
}
