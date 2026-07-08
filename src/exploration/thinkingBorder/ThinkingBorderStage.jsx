import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  THINKING_BORDER_SETTINGS,
  THINKING_SEQUENCE,
} from "@/exploration/thinkingBorder/thinkingBorderSettings.js";

const LABEL_EASE = [0.23, 1, 0.32, 1];
const LABEL_DURATION = 0.22;

/** State title - stable whole-word rotate so each status shares one rhythm. */
function StateLabel({ label, state, reduceMotion }) {
  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 7, filter: "blur(4px)" };
  const visible = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };
  const exit = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: -7, filter: "blur(4px)" };

  return (
    <span className="tbd-state-label">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          className="tbd-state-label-line"
          aria-hidden
          initial={hidden}
          animate={visible}
          exit={exit}
          transition={{ duration: LABEL_DURATION, ease: LABEL_EASE }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Interactive thinking-border canvas — no demo frame or dock. */
export function ThinkingBorderStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const state = THINKING_SEQUENCE[index % THINKING_SEQUENCE.length];
  const config = THINKING_BORDER_SETTINGS[state];

  /* Auto-cycle; clicking the orb advances immediately (the effect re-arms
     from the new index either way). */
  useEffect(() => {
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % THINKING_SEQUENCE.length),
      config.hold,
    );
    return () => window.clearTimeout(id);
  }, [index, config.hold]);

  return (
    <div className={className ? `tbd-root ${className}` : "tbd-root"}>
      <main className="tbd-stage" aria-label="Thinking border">
        <button
          type="button"
          className="tbd-phone"
          data-state={state}
          style={{
            "--tbd-hue": config.hue,
            "--tbd-speed": `${config.speed}s`,
            "--tbd-blur": `${config.blur}px`,
            "--tbd-glow": config.glow,
          }}
          onClick={() => setIndex((i) => (i + 1) % THINKING_SEQUENCE.length)}
          aria-label={`Assistant state: ${config.label} - activate to step to the next state`}
        >
          <span className="tbd-chip">
            <span className="tbd-orb" aria-hidden>
              <span className="tbd-ring" />
              <span className="tbd-screen">
                <span className="tbd-lumen tbd-lumen--near" />
                <span className="tbd-lumen tbd-lumen--far" />
                <span className="tbd-lumen tbd-lumen--core" />
              </span>
            </span>
            <span className="tbd-content">
              <StateLabel label={config.label} state={state} reduceMotion={reduceMotion} />
              {state === "responding" ? (
                <span className="tbd-stream" key={index}>
                  Here&rsquo;s a plan for your afternoon&hellip;
                </span>
              ) : null}
            </span>
          </span>
        </button>

        <span className="sr-only" role="status">
          {config.label}
        </span>
      </main>
    </div>
  );
}
