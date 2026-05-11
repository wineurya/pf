import { HugeiconsIcon } from "@hugeicons/react";
import { clsx } from "clsx";
import { NUGGET_HUGEICON_MAP, NUGGET_HUGEICON_FALLBACK } from "@/exploration/nuggetHugeicons.js";

/** Normalized label → `nuggets[].icon` key (matches `siteContent` + case highlights). */
const FOCUS_LABEL_TO_ICON_KEY = {
  "outcome clarity": "Layout01Icon",
  "structured cadence": "Calendar01Icon",
  "progress habits": "FallingStarIcon",
  "1:1 coaching": "QuoteUpIcon",
  wireframing: "Layout01Icon",
  prototyping: "Layers01Icon",
  "literature review": "BookOpen01Icon",
  "competitive auditing": "GridViewIcon",
  motion: "MagicWand01Icon",
  "research synthesis": "BookUserIcon",
  "competitive audit": "GridViewIcon",
};

/** Heuristic rules: [test, iconKey] — order matters (first match wins). */
const FOCUS_KEY_RULES = /** @type {const} */ ([
  [/1\s*:\s*1|coaching|coach|mentor/i, "QuoteUpIcon"],
  [/outcome|clarity/i, "Layout01Icon"],
  [/cadence|schedule|ritual/i, "Calendar01Icon"],
  [/progress|habit|streak/i, "FallingStarIcon"],
  [/wireframe/i, "Layout01Icon"],
  [/prototype/i, "Layers01Icon"],
  [/literature|synopsis/i, "BookOpen01Icon"],
  [/competitive|benchmark|\baudit/i, "GridViewIcon"],
  [/\bmotion\b|animation/i, "MagicWand01Icon"],
  [/research|synthesis/i, "BookUserIcon"],
  [/layout|ia\b|information architecture/i, "LayoutThreeColumnIcon"],
  [/craft|tooling|pen|vector/i, "PenTool01Icon"],
  [/desk|workshop|session/i, "ComputerDesk01Icon"],
  [/grid|matrix|table/i, "GridTableIcon"],
  [/mail|email|comms/i, "Mail01Icon"],
  [/code|engineering|frontend|react/i, "CodeCircleIcon"],
  [/figma|design system/i, "FigmaIcon"],
  [/framer|interaction/i, "FramerIcon"],
]);

function normalizeFocusLabel(label) {
  return String(label ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/**
 * @param {string} label
 * @returns {import("@hugeicons/core-free-icons").IconSvgObject}
 */
export function resolveFocusHighlightIcon(label) {
  const n = normalizeFocusLabel(label);
  const exact = FOCUS_LABEL_TO_ICON_KEY[n];
  if (exact && NUGGET_HUGEICON_MAP[exact]) return NUGGET_HUGEICON_MAP[exact];

  for (const [re, key] of FOCUS_KEY_RULES) {
    if (re.test(n) && NUGGET_HUGEICON_MAP[key]) return NUGGET_HUGEICON_MAP[key];
  }
  return NUGGET_HUGEICON_FALLBACK;
}

/**
 * Decorative Hugeicon beside a Focus marquee / static chip label (SR text stays on the pill string).
 * @param {{ label: string; className?: string }} props
 */
export function CaseStudyFocusHighlightIcon({ label, className }) {
  const icon = resolveFocusHighlightIcon(label);
  return (
    <HugeiconsIcon
      icon={icon}
      size={14}
      color="currentColor"
      strokeWidth={1.7}
      className={clsx("wx-case-tags__pill__icon shrink-0", className)}
      aria-hidden
    />
  );
}
