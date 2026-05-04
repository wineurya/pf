import { motion } from "motion/react";
import { clsx } from "clsx";

// k=200, d=24, m=0.9 → ζ≈0.89 (near-critical, fluid settle)
const PAPER_TRANSITION = { type: "spring", stiffness: 200, damping: 24, mass: 0.9 };

/* Poses tuned to Figma component 294:7 (Approach Step Card — fanned default). */
const PAPERS = [
  {
    key: "back",
    zIndex: 1,
    rest: { top: "-3%", left: "59%", rotate: -6 },
    hover: { top: "-5%", left: "62%", rotate: -10 },
  },
  {
    key: "middle",
    zIndex: 2,
    rest: { top: "13%", left: "30%", rotate: 2 },
    hover: { top: "10%", left: "27%", rotate: -5 },
  },
  {
    key: "front",
    zIndex: 3,
    rest: { top: "34%", left: "73%", rotate: 8 },
    hover: { top: "30%", left: "76%", rotate: 12 },
  },
];

function ResearchPaperLines() {
  return (
    <div className="wx-approach-folder-visual__paper-lines">
      <span className="wx-approach-folder-visual__line wx-approach-folder-visual__line--short" />
      <span className="wx-approach-folder-visual__line" />
      <span className="wx-approach-folder-visual__line wx-approach-folder-visual__line--mid" />
      <span className="wx-approach-folder-visual__line" />
    </div>
  );
}

function ResearchPaper({ paper, reduceMotion, active }) {
  const pose = reduceMotion || !active ? paper.rest : paper.hover;
  const transition = reduceMotion ? { duration: 0 } : PAPER_TRANSITION;

  return (
    <motion.div
      className="wx-approach-folder-visual__paper"
      style={{ zIndex: paper.zIndex }}
      initial={false}
      animate={{ ...pose, x: "-50%" }}
      transition={transition}
    >
      <ResearchPaperLines />
    </motion.div>
  );
}

export function ApproachStepFolderHoverVisual({ reduceMotion = false, active = false, className }) {
  return (
    <div className={clsx("wx-approach-folder-visual", className)} aria-hidden>
      <div className="wx-approach-folder-visual__shell" />
      <div className="wx-approach-folder-visual__stage">
        {PAPERS.map((paper) => (
          <ResearchPaper key={paper.key} paper={paper} reduceMotion={reduceMotion} active={active} />
        ))}
        <div className="wx-approach-folder-visual__pocket" />
      </div>
    </div>
  );
}
