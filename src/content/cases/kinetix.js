/* Case study: kinetix */

import kinetixCover from "../../assets/case/kinetix-cover.webp";

export const kinetix = {
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
  };
