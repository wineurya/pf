import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import "./animatedNumber.css";

const SWAP_EASE = [0.23, 1, 0.32, 1];
const SWAP_DURATION = 0.28;

/** Animated numeral — digits swap in with blur/opacity/scale. Columns are
    keyed from the right so the units column keeps its identity while the
    number grows or shrinks; a column whose digit did not change keeps its
    key and stays perfectly still. Reduced motion collapses the swap to a
    quick opacity fade. */
export function AnimatedNumber({ value, digits, className }) {
  const reduceMotion = useReducedMotion() ?? false;

  const safe = Math.max(0, Math.round(value));
  const chars = String(safe)
    .padStart(digits ?? 1, "0")
    .split("");

  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.6, filter: "blur(4px)" };
  const shown = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, scale: 1, filter: "blur(0px)" };
  const swap = reduceMotion
    ? { duration: 0.1 }
    : { duration: SWAP_DURATION, ease: SWAP_EASE };

  return (
    <span className={className ? `anum ${className}` : "anum"}>
      <span className="anum-sr">{String(safe)}</span>
      <span className="anum-cols" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          {chars.map((char, i) => (
            <motion.span
              className="anum-col"
              key={chars.length - i}
              layout={!reduceMotion}
              initial={hidden}
              animate={shown}
              exit={hidden}
              transition={swap}
            >
              {/* initial={false} here keeps a freshly mounted column from
                  double-animating: the wrapper blurs in, the digit rides it. */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  className="anum-digit"
                  key={char}
                  initial={hidden}
                  animate={shown}
                  exit={hidden}
                  transition={swap}
                >
                  {char}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </span>
  );
}
