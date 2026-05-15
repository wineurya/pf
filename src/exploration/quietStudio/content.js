/**
 * Quiet Studio — content & copy data.
 *
 * Hero copy comes from the source Figma (`12:96` in Design-Exploration file).
 * Added sections are written in the same studio voice: calm, considered,
 * pragmatic. No marketing fluff.
 */

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  eyebrow: "Digital Products, Quietly Designed",
  headlineLead: "Interfaces That Feel",
  headlineAccent: "Open",
  body: "We're a small design studio building calm, considered digital products for teams who are tired of visual noise and endless clutter.",
  ctaPrimary: { label: "Start a Project", href: "#contact" },
  ctaSecondary: { label: "View Selected Work", href: "#work" },
};

export const WORK = {
  eyebrow: "Selected Work",
  heading: { lead: "Built with intent.", accent: "Shipped with care." },
  pieces: [
    {
      year: "2025",
      sector: "Fintech · iOS",
      title: "Quiet ledger for self-employed",
      summary: "Replacing tax dread with a soft, weekly rhythm — five-minute reviews instead of April panic.",
      link: "#",
    },
    {
      year: "2025",
      sector: "Civic Tech · Web",
      title: "311 reports without the friction",
      summary: "A photo, a tap, a follow-up. We rebuilt the loop so residents actually finish what they start.",
      link: "#",
    },
    {
      year: "2024",
      sector: "Health · Mobile",
      title: "Coaching as quiet companion",
      summary: "When the plan slips, the app leans in — not with badges, but with one good next step.",
      link: "#",
    },
    {
      year: "2024",
      sector: "Productivity · Web",
      title: "Notes that hold the room",
      summary: "A writing surface that disappears at the right moments, holds structure at the others.",
      link: "#",
    },
  ],
};

export const APPROACH = {
  eyebrow: "Our Approach",
  heading: { lead: "Slow at the start,", accent: "fast where it counts." },
  body: "We pace work so the early choices stay reversible and the later ones don't surprise anyone. Calm doesn't mean slow.",
  pillars: [
    {
      step: "01",
      title: "Listen, then frame",
      body: "Interviews and shadowing before any pixel. We name the real problem before naming a solution.",
    },
    {
      step: "02",
      title: "Sketch in plain language",
      body: "Flows, not visuals. The team can critique structure before taste enters the room.",
    },
    {
      step: "03",
      title: "Prototype the risky bits",
      body: "Motion, edge cases, and the empty states get clickable first — that's where products break.",
    },
    {
      step: "04",
      title: "Hand it over, intact",
      body: "Specs, states, and front-end notes travel with the work so nothing softens on the way to build.",
    },
  ],
};

export const JOURNAL = {
  eyebrow: "From the Journal",
  heading: { lead: "Notes from the bench.", accent: null },
  body: "Short essays on craft, restraint, and the small decisions that shape calm software.",
  entries: [
    {
      date: "Apr 24, 2026",
      readTime: "6 min",
      title: "Why we don't ship at midnight",
      excerpt: "A short defence of unhurried release cadences, and why the first hour after launch belongs to your users — not your team.",
    },
    {
      date: "Mar 11, 2026",
      readTime: "4 min",
      title: "Empty states are the product",
      excerpt: "The screen with nothing on it is doing more work than the one with everything. Here's how to give it the attention it deserves.",
    },
    {
      date: "Feb 02, 2026",
      readTime: "8 min",
      title: "The case for less motion",
      excerpt: "Restraint as a feature. When ease curves stop apologising and start carrying meaning instead.",
    },
  ],
};

export const CONTACT = {
  eyebrow: "Start the Conversation",
  heading: { lead: "Tell us what's", accent: "quietly broken." },
  body: "We work with two clients at a time, in 6-to-12-week engagements. Send a few lines about the problem — we'll reply within two days.",
  cta: { label: "Start a Project", href: "mailto:hello@example.com" },
  fineprint: "Atlanta · remote-first · EST overlap",
};

export const FOOTER = {
  studioName: "Quiet Form Studio",
  year: 2026,
  links: [
    { label: "Email", href: "mailto:hello@example.com" },
    { label: "LinkedIn", href: "#" },
    { label: "Are.na", href: "#" },
  ],
};
