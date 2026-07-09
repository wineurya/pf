/* Case study: avance */

import avanceCover from "../../assets/case/avance-cover.webp";

export const avance = {
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
  };
