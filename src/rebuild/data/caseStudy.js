/**
 * Rebuild · Case Study — sample content (long-form prose draft).
 *
 * Shape mirrors the existing case studies so a real data layer can slot in
 * later. Chapters use a `lead` paragraph (renders larger / with a drop cap)
 * plus a `paragraphs` array; optional `quote` and `media` interrupt the flow
 * the way an editorial layout would.
 */

export const SAMPLE_CASE = {
  slug: "avance",
  year: "2025",
  sector: "Fintech · iOS",
  role: "Lead Product Designer",
  duration: "8 weeks · 2 sprints",
  team: "1 designer · 2 engineers · 1 PM",
  status: "Live · v2.1",
  title: "Coaching when you slow down",
  lede:
    "Avance pairs people with a real coach the moment momentum drops — replacing motivational badges with one good next step.",
  tags: ["Onboarding", "Habit loops", "Motion", "Empty states", "Behavioural copy"],
  kicker: { label: "Case Study", color: "#2563EB" },

  // Aside CTAs — same shape as the home hero buttons.
  asideCtas: [
    { id: "primary", label: "Get in touch", href: "/#rebuild-contact" },
    { id: "secondary", label: "Back to work", href: "/#rebuild-work" },
  ],

  cover: {
    caption: "Avance · Plan, deadline, real coach.",
    ratio: "16/9",
  },

  chapters: [
    {
      id: "overview",
      eyebrow: "Overview",
      title: "A coaching app that had to learn to be quiet.",
      lead:
        "Avance is a coaching app for people working on long-term goals. Debt, language, fitness, anything that takes longer than a sprint and breaks down before it pays off. The product team came in with a working v1 that lived on streaks and badges, and a problem they couldn't ignore: retention past week three sat at eleven percent.",
      paragraphs: [
        "We weren't being asked to make the app prettier. We were being asked to keep the people who slow down — without bribing them. Streaks were the easy lever, and the team had already pulled it. What was left was harder: figure out what was actually happening at week three, and design for that, not for the metric the dashboard was watching.",
        "I joined as the only designer on a four-person pod for an eight-week engagement. The brief was clean. The constraint was tight. The budget for visual fireworks was effectively zero — anything that looked like a casino was off the table from day one.",
      ],
    },

    {
      id: "context",
      eyebrow: "Context",
      title: "The drop-off was emotional, not mechanical.",
      lead:
        "Twenty interviews into discovery, the shape of the problem stopped being a mystery. Users didn't quit because the app was hard or because notifications were broken. They quit because the app went quiet at exactly the moment they needed a person.",
      paragraphs: [
        "The pattern was almost the same across debt-payoff, language, and fitness goals. Week one was carried by the novelty of having a plan. Week two was carried by early progress. Week three was where life happened — a missed payment, a skipped lesson, a flu — and the app went from celebrating to scolding without realising it.",
        "The streak system was reading the user's silence as failure and responding with louder versions of itself. More notifications, redder ring indicators, more aggressive copy. Every signal the system had was a hammer, and every problem looked like a nail.",
        "The fix we'd been hired to design wasn't going to be a redesigned home screen. It was going to be a redesigned relationship between the product and the bad week.",
      ],
      quote: {
        text: "I missed two days and the app started yelling at me. So I uninstalled it. That's the whole story.",
        attribution: "Research participant, week-three churn cohort",
      },
    },

    {
      id: "reframing",
      eyebrow: "Reframing",
      title: "From streaks to states.",
      lead:
        "We rebuilt the home screen around a single piece of state: are you on plan, ahead, or slipping? Each state has its own copy, its own coach availability, and its own next action. The grid of metrics that used to live there moved into a quieter weekly review screen, where it could be examined instead of performed.",
      paragraphs: [
        "The reframing did most of the work. Once the product knew which state a user was in, every other surface had a clearer job. Push notifications stopped celebrating yesterday's wins on a bad day. The coach card stopped being a static promo and started actually reflecting whether a coach was online.",
        "The slipping state was the one we obsessed over. It got its own tone, its own pace, its own typography weight. It needed to read as steady, not corrective. The smallest detail that mattered: the heading switched from a celebratory sans to a slightly narrower, more measured cut. Visually subtle. Emotionally enormous.",
        "Empty states became a feature. The first week of a new goal lives in an empty state, and so does the week after a missed deadline. We wrote those screens like letters from a coach — not from a brand.",
      ],
    },

    {
      id: "approach",
      eyebrow: "Approach",
      title: "Writing as design.",
      lead:
        "The hardest part of the project wasn't visual. It was the writing. We rewrote forty-seven UI strings with a behavioural science consultant, and every one of them got tested against the slipping state. If a string read as a scold, it didn't ship.",
      paragraphs: [
        "I built a copy library next to the component library — same source of truth, same review cadence, same person-on-call when something needed nuance. Every variant included tone notes (what feeling should this leave?), trigger conditions (when does this run?), and a coach handoff flag (should this open a chat?).",
        "Motion got the same treatment. We made one ease curve the studio's responsibility and applied it consistently — `cubic-bezier(0.22, 1, 0.36, 1)` — and we cut every animation that didn't serve comprehension. The home screen went from twelve motion moments to four. The four that survived earn their position.",
        "Prototyping happened in Figma but landed in TestFlight quickly. We pushed three buildable prototypes inside the eight-week window, each with a tighter slipping-state experience. Coach response time and the slipping-state notification went into A/B testing under feature flags before week six.",
      ],
      media: { id: "cover-approach", ratio: "16/10", caption: "Plan setup — slip-aware copy variants" },
    },

    {
      id: "outcomes",
      eyebrow: "Outcomes",
      title: "Retention doubled. The reviews got specific.",
      lead:
        "Week-three retention moved from eleven percent to twenty-three in the first cohort post-launch, and held through three more cohorts of similar size. Coach-initiated conversations increased four-point-two times and ended faster on average — the coach pickup got better at meeting the user where they actually were, not where the badge said they should be.",
      paragraphs: [
        "The bigger win was qualitative. App store reviews shifted from 'great app' to comments that named specific moments: the empty state after a missed week, the way the home screen looked on a quiet Tuesday, the change in coach availability copy.",
        "Specificity matters because it tells you the product is doing something the user can describe. Vague praise means a vague product. Specific praise means people are noticing where the work landed.",
        "Net Promoter Score moved from forty-two to sixty-one across the launch quarter. That's the line that booked the next round of funding. It also bought us permission to slow down and ship a follow-up cycle without pressure for another big bang.",
      ],
    },

    {
      id: "reflection",
      eyebrow: "Reflection",
      title: "What I'd do differently.",
      lead:
        "If we ran this again I'd put the behavioural science consultant in the room earlier — week one, not week three. Half of what we learned in the writing phase could have shaped the discovery questions. The other half could have shaped the prototypes we built first.",
      paragraphs: [
        "I'd also push harder on the analytics setup before any visual work started. We spent a week reverse-engineering the dashboard at the front end of the project; that should have been the engineering team's first commit, not their third.",
        "What I wouldn't change: the constraint that everything we shipped had to read calmly on the slipping state. That single rule pulled the project together. Every disagreement got tested against it, and most of them got resolved without escalating.",
      ],
    },
  ],

  metrics: [
    { label: "Week-3 retention", value: "23%", delta: "+12 pts" },
    { label: "Coach replies / wk", value: "4.2×", delta: "vs. v1" },
    { label: "Time to first plan", value: "2:14", delta: "−38%" },
    { label: "NPS (launch quarter)", value: "61", delta: "+19" },
  ],

  media: [
    { id: "m-1", ratio: "16/9",  caption: "Home — on plan / ahead / slipping states" },
    { id: "m-2", ratio: "5/4",   caption: "Coach handoff card" },
    { id: "m-3", ratio: "5/4",   caption: "Weekly review · quiet badge replacement" },
    { id: "m-4", ratio: "16/10", caption: "Notification copy library — slipping variants" },
    { id: "m-5", ratio: "5/4",   caption: "Empty state — first-week onboarding" },
    { id: "m-6", ratio: "5/4",   caption: "Coach availability — live state" },
  ],

  next: {
    label: "Next case",
    slug: "incity",
    title: "311 reports without the friction",
    tease: "Civic tech · web · 2025",
  },
};
