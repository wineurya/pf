import { motion } from "motion/react";
import { clsx } from "clsx";

const PAPER_TRANSITION = { type: "spring", stiffness: 250, damping: 28, mass: 0.85 };

const PAPERS = [
  {
    key: "back",
    zIndex: 1,
    rest: { top: "4.8%", left: "50%", rotate: 0 },
    hover: { top: "4.8%", left: "50%", rotate: 0 },
  },
  {
    key: "middle",
    zIndex: 2,
    rest: { top: "16.1%", left: "47%", rotate: 0 },
    hover: { top: "8.6%", left: "34%", rotate: -11.2 },
  },
  {
    key: "front",
    zIndex: 3,
    rest: { top: "31.5%", left: "52%", rotate: 0 },
    hover: { top: "23.6%", left: "57%", rotate: 12 },
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

function ResearchPaper({ paper, reduceMotion }) {
  const transition = reduceMotion ? { duration: 0 } : PAPER_TRANSITION;

  return (
    <motion.div
      className="wx-approach-folder-visual__paper"
      style={{ zIndex: paper.zIndex }}
      variants={{
        rest: { ...paper.rest, x: "-50%", transition },
        hover: { ...(reduceMotion ? paper.rest : paper.hover), x: "-50%", transition },
      }}
    >
      <ResearchPaperLines />
    </motion.div>
  );
}

export function ApproachStepFolderHoverVisual({ reduceMotion = false, className }) {
  return (
    <div className={clsx("wx-approach-folder-visual", className)} aria-hidden>
      <div className="wx-approach-folder-visual__shell" />
      <div className="wx-approach-folder-visual__stage">
        {PAPERS.map((paper) => (
          <ResearchPaper key={paper.key} paper={paper} reduceMotion={reduceMotion} />
        ))}
        <div className="wx-approach-folder-visual__pocket" />
      </div>
    </div>
  );
}
