import { clsx } from "clsx";
import { motion } from "motion/react";

const FOLDER_LOOP = {
  duration: 3.2,
  repeat: Infinity,
  repeatType: "mirror",
  ease: [0.45, 0, 0.55, 1],
};

const PAPER_DECK = [
  {
    key: "back",
    top: "4.75%",
    stack: { x: 0, y: 0, rotate: 0 },
    hover: { x: 0, y: 0, rotate: 0 },
    z: 1,
  },
  {
    key: "middle",
    top: "16.1%",
    stack: { x: -7, y: 0, rotate: 0 },
    hover: { x: -15, y: -4, rotate: -11.2 },
    z: 2,
  },
  {
    key: "front",
    top: "31.5%",
    stack: { x: 4, y: 0, rotate: 0 },
    hover: { x: 14, y: -2, rotate: 12 },
    z: 3,
  },
];

function ResearchPaperLines() {
  return (
    <div className="wx-approach-folder__paper-lines">
      <span className="wx-approach-folder__line wx-approach-folder__line--short" />
      <span className="wx-approach-folder__line" />
      <span className="wx-approach-folder__line wx-approach-folder__line--mid" />
      <span className="wx-approach-folder__line" />
    </div>
  );
}

function ResearchPaper({ paper, state, animateHover }) {
  const target = paper[state];
  const animate =
    animateHover && state === "hover"
      ? {
          x: [paper.stack.x, paper.hover.x],
          y: [paper.stack.y, paper.hover.y],
          rotate: [paper.stack.rotate, paper.hover.rotate],
        }
      : target;

  return (
    <motion.div
      className="wx-approach-folder__paper"
      style={{ top: paper.top, zIndex: paper.z }}
      initial={false}
      animate={animate}
      transition={animateHover && state === "hover" ? FOLDER_LOOP : { duration: 0 }}
    >
      <ResearchPaperLines />
    </motion.div>
  );
}

function ResearchFolder({ state = "stack", animateHover = false, className }) {
  return (
    <div className={clsx("wx-approach-folder", className)} aria-hidden="true">
      <div className="wx-approach-folder__shell" />
      <div className="wx-approach-folder__stage">
        {PAPER_DECK.map((paper) => (
          <ResearchPaper key={paper.key} paper={paper} state={state} animateHover={animateHover} />
        ))}
        <div className="wx-approach-folder__pocket" />
      </div>
    </div>
  );
}

export function ApproachStepFolderVisualPair({ reduceMotion = false, className }) {
  return (
    <div className={clsx("wx-approach-folder-pair", className)} aria-hidden="true">
      <ResearchFolder state="stack" />
      <ResearchFolder state="hover" animateHover={!reduceMotion} />
    </div>
  );
}
