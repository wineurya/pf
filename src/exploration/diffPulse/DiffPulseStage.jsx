import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Odometer } from "@/exploration/shared/Odometer.jsx";
import DIFF_PULSE_EVENTS from "@/exploration/diffPulse/diffPulseData.json";

const TICK_MS = 800;
const WINDOW = 4;

const ROW_TRANSITION = { duration: 0.32, ease: [0.23, 1, 0.32, 1] };

/* Decorative diff lines — the addition reads as a case-study highlight
   (ink + tinted fill); when a line replaced something, the old value sits
   struck-through to its right, so each row reads as a correction. `del`
   is always the literal thing the `add` replaced. Keep add + del under
   ~46ch combined so nothing clips. The totals below stay real (git
   history); these are set dressing. */
const DIFF_LINES = [
  { add: "gap: var(--space-4);", del: "margin-top: 24px;" },
  { add: "const reduce = useReducedMotion();" },
  { add: "transition: opacity 240ms;", del: "300ms;" },
  { add: "requestAnimationFrame(open);", del: "setTimeout(…)" },
  { add: "if (reduce) return;" },
  { add: "width: min(720px, 100%);", del: "100vw;" },
  { add: "el.animate(fade, options);", del: "style.opacity = 0;" },
  { add: "layout={!reduceMotion}" },
  { add: "color: var(--text-muted);", del: "#999;" },
  { add: "cancelAnimationFrame(raf.current);" },
  { add: "ease: [0.23, 1, 0.32, 1],", del: '"linear",' },
  { add: 'aria-hidden="true"' },
  { add: "duration: 0.32,", del: "0.5," },
  { add: "inset: 0;", del: "top: 0; left: 0;" },
];

const MAX_LINE_LENGTH = Math.max(
  ...DIFF_LINES.map((l) => l.add.length + (l.del?.length ?? 0)),
);

/* New lines always insert at the top of the stack, so position-based
   variety never shows up. Instead the drop scales with how long the
   snippet is: bigger lines land with a touch more weight and take a
   beat longer. Real variety, not a random wiggle. */
function rowAnimation(weight) {
  return {
    initial: { y: -8 - weight * 6, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 5 + weight * 3, opacity: 0 },
    transition: { duration: 0.26 + weight * 0.12, ease: [0.23, 1, 0.32, 1] },
  };
}

/** Diff-pulse canvas — real {add, del} stats from this repo's git history
    (see scripts/generate-diff-pulse-data.mjs) drive the totals; the code
    lines above them are decorative. Pass a different `events` array to
    visualize other data; numbers are never hardcoded here. */
export function DiffPulseStage({ className, events = DIFF_PULSE_EVENTS }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(
      () => setCount((c) => (c >= events.length ? 1 : c + 1)),
      TICK_MS,
    );
    return () => window.clearInterval(id);
  }, [events.length, reduceMotion]);

  /* Reduced motion: no loop — resolve to the full dataset and stand still. */
  const shown = reduceMotion ? events.length : Math.min(count, events.length);

  let totalAdd = 0;
  let totalDel = 0;
  for (let i = 0; i < shown; i += 1) {
    totalAdd += events[i].add;
    totalDel += events[i].del;
  }

  const rows = events
    .slice(Math.max(0, shown - WINDOW), shown)
    .map((_, i) => {
      const key = Math.max(0, shown - WINDOW) + i;
      return { line: DIFF_LINES[key % DIFF_LINES.length], key };
    })
    .reverse();

  return (
    <div className={className ? `dfp-root ${className}` : "dfp-root"}>
      <main className="dfp-stage" aria-label="Lines changed — add and delete totals from this repo's git history">
        <div className="dfp-panel" data-static={reduceMotion || undefined}>
          <div className="dfp-lines-wrap">
            <div className="dfp-lines" aria-hidden>
              <AnimatePresence mode="popLayout" initial={false}>
                {rows.map(({ line, key }) => {
                  const length = line.add.length + (line.del?.length ?? 0);
                  const rowMotion = rowAnimation(length / MAX_LINE_LENGTH);
                  return (
                    <motion.div
                      key={key}
                      className="dfp-row"
                      layout={!reduceMotion}
                      initial={reduceMotion ? false : rowMotion.initial}
                      animate={rowMotion.animate}
                      exit={reduceMotion ? undefined : rowMotion.exit}
                      transition={reduceMotion ? ROW_TRANSITION : rowMotion.transition}
                    >
                      <span className="dfp-line dfp-line--add">{line.add}</span>
                      {line.del ? (
                        <span className="dfp-line dfp-line--del">
                          {line.del}
                        </span>
                      ) : null}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          <div className="dfp-head">
            <span className="dfp-label">Lines changed</span>
            <span className="dfp-totals">
              <span className="dfp-total dfp-total--add">
                <span className="dfp-sign" aria-hidden>
                  +
                </span>
                <Odometer value={totalAdd} />
              </span>
              <span className="dfp-total dfp-total--del">
                <span className="dfp-sign" aria-hidden>
                  −
                </span>
                <Odometer value={totalDel} />
              </span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
