import { motion } from "motion/react";
import { clsx } from "clsx";

// k=200, d=24, m=0.9 → ζ≈0.89 (near-critical, fluid settle)
const PAPER_TRANSITION = { type: "spring", stiffness: 200, damping: 24, mass: 0.9 };

/** Figma `294:13` Folder visual — inner folder `294:14` is 422×249; papers are absolute in that space. */
const FOLDER_W = 422;
const FOLDER_H = 249;

const POCKET_SRC = `${import.meta.env.BASE_URL}exploration/approach-folder-pocket.png`;

const PAPERS = [
  {
    key: "back",
    zIndex: 1,
    width: 194 / FOLDER_W,
    height: 180 / FOLDER_H,
    rest: { top: -12 / FOLDER_H, left: 152 / FOLDER_W, rotate: 0 },
    hover: { top: (-12 - 5) / FOLDER_H, left: (152 + 12) / FOLDER_W, rotate: -3.5 },
  },
  {
    key: "middle",
    zIndex: 2,
    width: 194 / FOLDER_W,
    height: 142 / FOLDER_H,
    rest: { top: 37.050445556640625 / FOLDER_H, left: 30 / FOLDER_W, rotate: 0 },
    hover: { top: (37.050445556640625 - 4) / FOLDER_H, left: (30 - 10) / FOLDER_W, rotate: 2.5 },
  },
  {
    key: "front",
    zIndex: 3,
    width: 194 / FOLDER_W,
    height: 142 / FOLDER_H,
    rest: { top: 88.7431640625 / FOLDER_H, left: 211 / FOLDER_W, rotate: 0 },
    hover: { top: (88.7431640625 - 5) / FOLDER_H, left: (211 + 12) / FOLDER_W, rotate: 4 },
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
      style={{
        zIndex: paper.zIndex,
        width: `${paper.width * 100}%`,
        height: `${paper.height * 100}%`,
      }}
      initial={false}
      animate={{
        top: `${pose.top * 100}%`,
        left: `${pose.left * 100}%`,
        rotate: pose.rotate,
      }}
      transition={transition}
    >
      <ResearchPaperLines />
    </motion.div>
  );
}

export function ApproachStepFolderHoverVisual({ reduceMotion = false, active = false, className }) {
  return (
    <div className={clsx("wx-approach-folder-visual", className)} aria-hidden>
      <div className="wx-approach-folder-visual__stage">
        {PAPERS.map((paper) => (
          <ResearchPaper key={paper.key} paper={paper} reduceMotion={reduceMotion} active={active} />
        ))}
        <div className="wx-approach-folder-visual__pocket" aria-hidden>
          <img className="wx-approach-folder-visual__pocket-img" src={POCKET_SRC} alt="" draggable={false} />
        </div>
      </div>
    </div>
  );
}
