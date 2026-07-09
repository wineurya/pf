import {
  IconBell,
  IconBulletList,
  IconClipboard,
  IconColorPalette,
  IconCreditCard,
  IconGauge,
  IconTrendDown,
  IconSealCheck,
  IconGuideAccess,
  IconGuideInteraction,
  IconGuideVisual,
  IconHandTap,
  IconLawAsterisk,
  IconLawBookmarks,
  IconLawCrosshair,
  IconLawDashed,
  IconLawMagnet,
  IconLawSeven,
  IconLayersThree,
  IconLayoutGrid2,
  IconMapPin,
  IconQuestion,
  IconShield,
  IconUser,
} from "../../lib/icons.jsx";
import { caseStudies } from "../../content.js";

/* Each named section carries an accent that colors load-bearing underlines — a
   color identifier per section. Keyed by section title; the accent slug resolves
   to a `--mark-color` in CSS.
   Sections that sit adjacent within a study always land on distinct hues; an
   unmapped title falls back to the default gold. */
export const SECTION_ACCENT = {
  Overview: "overview",
  "The idea": "ideation",
  "The concept": "ideation",
  "The brief": "ideation",
  "The experiment": "ideation",
  "The problem": "problem",
  Research: "research",
  Personas: "personas",
  Wireframes: "wireframes",
  Design: "design",
  Features: "features",
  "The site": "features",
  Outcomes: "results",
  "The laws": "results",
  "Sprint 2": "results",
  "Sprint 1": "sprint",
  Retrospective: "retro",
};

/* Sheet-row markers — tiny "brand shape" glyphs (sparkle / clover / burst /
   squircle) cycled by section order so adjacent rows never repeat. Each fills
   with the row's accent via CSS; a plain dot read as unfinished UI here. */
const SECTION_GLYPHS = [
  /* Sparkle — concave four-point star. */
  <path d="M6 0C6.9 3.8 8.2 5.1 12 6 8.2 6.9 6.9 8.2 6 12 5.1 8.2 3.8 6.9 0 6 3.8 5.1 5.1 3.8 6 0Z" />,
  /* Clover — four overlapping petals. */
  <g>
    <circle cx="6" cy="3.2" r="2.9" />
    <circle cx="8.8" cy="6" r="2.9" />
    <circle cx="6" cy="8.8" r="2.9" />
    <circle cx="3.2" cy="6" r="2.9" />
  </g>,
  /* Burst — eight-point star. */
  <path d="M12 6 9.7 7.53 10.24 10.24 7.53 9.7 6 12 4.47 9.7 1.76 10.24 2.3 7.53 0 6 2.3 4.47 1.76 1.76 4.47 2.3 6 0 7.53 2.3 10.24 1.76 9.7 4.47Z" />,
  /* Squircle — superellipse coin. */
  <path d="M6 0C10.5 0 12 1.5 12 6 12 10.5 10.5 12 6 12 1.5 12 0 10.5 0 6 0 1.5 1.5 0 6 0Z" />,
];

export function SectionGlyph({ index, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
    >
      {SECTION_GLYPHS[index % SECTION_GLYPHS.length]}
    </svg>
  );
}

/* Optional per-cell glyphs (Central icons) — feature cells can name one to
   anchor the title. Content stays plain data via these slugs; missing/unknown
   names render no icon. */
export const CELL_ICONS = {
  palette: IconColorPalette,
  layers: IconLayersThree,
  grid: IconLayoutGrid2,
  user: IconUser,
  map: IconMapPin,
  clipboard: IconClipboard,
  /* InCity outcome stats — premium glyph per result metric. */
  faster: IconGauge,
  errorRate: IconTrendDown,
  retention: IconSealCheck,
  /* Logitech laws — decorative slugs, not reused on InCity feature cells. */
  lawMagnet: IconLawMagnet,
  lawCrosshair: IconLawCrosshair,
  lawSeven: IconLawSeven,
  lawAsterisk: IconLawAsterisk,
  lawDashed: IconLawDashed,
  lawBookmarks: IconLawBookmarks,
  /* InCity problem cols — mobile pain, long flows, invisible status. */
  handTap: IconHandTap,
  steps: IconBulletList,
  question: IconQuestion,
  /* InCity research cols — dependable alerts, payments, privacy. */
  alerts: IconBell,
  payment: IconCreditCard,
  privacy: IconShield,
};

/* Central-icon glyphs anchored to the feature-guide trigger words in the
   sticky left column. Slugs come from each guide entry in content. */
export const GUIDE_ICONS = {
  visual: IconGuideVisual,
  access: IconGuideAccess,
  interaction: IconGuideInteraction,
};

/* Labeled meta fields, in render order. */
export const FACT_FIELDS = [
  { key: "role", label: "Role" },
  { key: "team", label: "Team" },
  { key: "duration", label: "Duration" },
  { key: "tools", label: "Tools" },
];

/* The header travels (layoutId), so the body holds back a beat and then
   follows in the app's usual reveal language. */
export const bodyStagger = (reducedMotion) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reducedMotion ? 0.03 : 0.045,
      delayChildren: reducedMotion ? 0 : 0.1,
    },
  },
  /* Exit TOP-DOWN, not reversed. Motion flattens every RevealItem in the page
     into one stagger pool, so a reverse cascade starts at the off-screen bottom
     and the visible top leaves last — on long studies that reads as a ~0.5s
     pause after Back before anything reacts. Top-down with a tiny step makes the
     visible cluster fall away immediately; off-screen blocks trail harmlessly. */
  exit: {
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.008,
      staggerDirection: 1,
    },
  },
});

/* Splits paragraph text by guide term names and wraps each occurrence in an
   animated span that highlights as the matching features scroll into view. */
export function renderWithGuide(text, guide, activeGuide) {
  if (!guide || !guide.length || typeof text !== "string") return text;
  const terms = guide.map((g) => g.term);
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, i) => {
    const idx = terms.indexOf(part);
    if (idx >= 0) {
      const GuideIcon = guide[idx].icon ? GUIDE_ICONS[guide[idx].icon] : null;
      return (
        <span key={i} className={`cs__guide-term${idx === activeGuide ? " is-active" : ""}`}>
          {GuideIcon ? <GuideIcon className="cs__guide-icon" size={15} ariaHidden /> : null}
          {part}
        </span>
      );
    }
    return part;
  });
}

export function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function groupSections(blocks) {
  const sections = [];
  let current = { title: null, id: null, blocks: [] };
  for (const block of blocks) {
    if (block.section) {
      if (current.blocks.length) sections.push(current);
      current = { title: block.section, id: slugifyTitle(block.section), blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }
  if (current.blocks.length) sections.push(current);
  return sections;
}

/** Named (id-bearing) sections for a study — shared so the App-level mobile dock
    can render synchronously on open (same commit as the home dock unmounts) for a
    clean shared-element morph, without waiting on CaseStudy's first layout effect. */
export function sectionsForStudy(slug) {
  const study = caseStudies[slug];
  if (!study) return [];
  return groupSections(study.blocks).filter((s) => s.id);
}

