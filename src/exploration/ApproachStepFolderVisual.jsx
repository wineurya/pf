import { motion } from "motion/react";
import { clsx } from "clsx";

const LOOP = { duration: 3.6, repeat: Infinity, ease: [0.45, 0, 0.55, 1] };

/** Stacked (Figma 288:94 left) vs fanned (right); `top` sets deck order. */
const PAPERS = [
  { top: "4%", stack: { rotate: 0, x: 0, y: 0 }, fan: { rotate: -11, x: -5, y: 6 }, z: 3 },
  { top: "18%", stack: { rotate: 0, x: 3, y: 0 }, fan: { rotate: -7, x: -2, y: 5 }, z: 2 },
  { top: "32%", stack: { rotate: 0, x: -2, y: 0 }, fan: { rotate: 12, x: 8, y: 4 }, z: 1 },
];

function PaperLines() {
  return (
    <div className="wx-approach-folder__paper-lines">
      <span className="wx-approach-folder__line wx-approach-folder__line--short" />
      <span className="wx-approach-folder__line" />
      <span className="wx-approach-folder__line wx-approach-folder__line--mid" />
      <span className="wx-approach-folder__line" />
    </div>
  );
}

function AnimatedPaper({ cfg, reduceMotion, animated }) {
  const staticStack = reduceMotion || !animated;
  return (
    <motion.div
      className="wx-approach-folder__paper"
      style={{ top: cfg.top, zIndex: cfg.z }}
      initial={false}
      animate={
        staticStack
          ? { ...cfg.stack, transition: { duration: 0 } }
          : {
              rotate: [cfg.stack.rotate, cfg.fan.rotate, cfg.stack.rotate],
              x: [cfg.stack.x, cfg.fan.x, cfg.stack.x],
              y: [cfg.stack.y, cfg.fan.y, cfg.stack.y],
            }
      }
      transition={staticStack ? { duration: 0 } : LOOP}
    >
      <PaperLines />
    </motion.div>
  );
}

/**
 * Figma Testing 288:94 — folder + research cards; accent from parent `--wx-approach-accent`.
 * @param {{ reduceMotion?: boolean; animated?: boolean; className?: string }} props
 *   `animated` false — stacked “default” only (left column in dev frame).
 */
export function ApproachStepFolderVisual({ reduceMotion, animated = true, className }) {
  return (
    <div className={clsx("wx-approach-folder", className)} aria-hidden>
      <div className="wx-approach-folder__bg" />
      <div className="wx-approach-folder__stage">
        <div className="wx-approach-folder__papers">
          {PAPERS.map((cfg, i) => (
            <AnimatedPaper key={i} cfg={cfg} reduceMotion={reduceMotion} animated={animated} />
          ))}
        </div>
        <div className="wx-approach-folder__pocket" />
      </div>
    </div>
  );
}

/**
 * Pair: static default (left) + motion hover loop (right); Figma 288:94.
 */
export function ApproachStepFolderVisualPair({ reduceMotion, className }) {
  const allowMotion = !reduceMotion;
  return (
    <div className={clsx("wx-approach-folder-pair", className)} aria-hidden>
      <ApproachStepFolderVisual reduceMotion animated={false} />
      <ApproachStepFolderVisual reduceMotion={reduceMotion} animated={allowMotion} />
    </div>
  );
}
