import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Odometer } from "@/exploration/shared/Odometer.jsx";
import DIFF_PULSE_EVENTS from "@/exploration/diffPulse/diffPulseData.json";

const TICK_MS = 800;
const WINDOW = 8;

const ROW_TRANSITION = { duration: 0.32, ease: [0.23, 1, 0.32, 1] };

/** Diff-pulse canvas — real {add, del} stats from this repo's git history
    (see scripts/generate-diff-pulse-data.mjs). Pass a different `events`
    array to visualize other data; numbers are never hardcoded here. */
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

  /* sqrt scale keeps the bootstrap mega-commits from flattening everything
     else into hairlines. */
  const maxSpan = Math.max(...events.map((e) => Math.sqrt(e.add + e.del)), 1);

  const rows = (
    reduceMotion
      ? events.map((event, i) => ({ event, key: i }))
      : events
          .slice(Math.max(0, shown - WINDOW), shown)
          .map((event, i) => ({ event, key: Math.max(0, shown - WINDOW) + i }))
          .reverse()
  );

  return (
    <div className={className ? `dfp-root ${className}` : "dfp-root"}>
      <main className="dfp-stage" aria-label="Diff pulse — line changes from this repo's git history">
        <div className="dfp-panel" data-static={reduceMotion || undefined}>
          <div className="dfp-head">
            <span className="dfp-label">Lines changed</span>
            <span className="dfp-totals">
              <span className="dfp-total dfp-total--add">
                +<Odometer value={totalAdd} />
              </span>
              <span className="dfp-total dfp-total--del">
                −<Odometer value={totalDel} />
              </span>
            </span>
          </div>

          <div className="dfp-bars" aria-hidden>
            <AnimatePresence mode="popLayout" initial={false}>
              {rows.map(({ event, key }) => {
                const total = event.add + event.del;
                const span = Math.sqrt(total) / maxSpan;
                return (
                  <motion.div
                    key={key}
                    className="dfp-bar"
                    style={{ width: `${Math.max(span * 100, 3)}%` }}
                    layout={!reduceMotion}
                    initial={reduceMotion ? false : { y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: 8, opacity: 0 }}
                    transition={ROW_TRANSITION}
                  >
                    <span
                      className="dfp-bar-add"
                      style={{ flexGrow: event.add }}
                    />
                    <span
                      className="dfp-bar-del"
                      style={{ flexGrow: event.del }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <span className="dfp-sub" aria-hidden>
            this site&rsquo;s own commits
          </span>
        </div>
      </main>
    </div>
  );
}
