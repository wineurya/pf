/* Case study: siren */

import sirenCover from "../../assets/case/siren-cover.webp";
import sirenLeanUxCanvas from "../../assets/case/siren-lean-ux-canvas.webp";
import sirenPersonaAubrey from "../../assets/case/siren-persona-aubrey.webp";
import sirenPersonaAubreyJpg from "../../assets/case/siren-persona-aubrey.jpg";
import sirenHypothesisMatrix from "../../assets/case/siren-hypothesis-matrix.webp";
import sirenSprint1Flags from "../../assets/case/siren-sprint1-flags.webp";
import sirenSprint2VideoCall from "../../assets/case/siren-sprint2-video-call.webp";
import sirenCatfishTesting from "../../assets/case/siren-catfish-testing.webp";
import sirenHifiPass from "../../assets/case/siren-hifi-pass.webp";

export const siren = {
    title: "Siren",
    meta: "Dating Safety",
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
  };
