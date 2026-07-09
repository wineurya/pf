/* Case study: resolutions */

import resolutionsCover from "../../assets/case/resolutions-cover.webp";
import resolutionsVision from "../../assets/case/resolutions-vision.webp";
import resolutionsResearchLitReview from "../../assets/case/resolutions-research-litreview.webp";
import resolutionsResearchAudit from "../../assets/case/resolutions-research-audit.webp";
import resolutionsResearchInterview from "../../assets/case/resolutions-research-interview.webp";
import resolutionsPersonaTia from "../../assets/case/resolutions-persona-tia.webp";
import resolutionsPersonaTiaJpg from "../../assets/case/resolutions-persona-tia.jpg";
import resolutionsSketchPlanner from "../../assets/case/resolutions-sketch-planner.webp";
import resolutionsSketchTracker from "../../assets/case/resolutions-sketch-tracker.webp";
import resolutionsSketchCommunity from "../../assets/case/resolutions-sketch-community.webp";
import resolutionsHifiDay from "../../assets/case/resolutions-hifi-day.webp";

export const resolutions = {
    title: "Resolutions",
    meta: "Daily Planner",
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
  };
