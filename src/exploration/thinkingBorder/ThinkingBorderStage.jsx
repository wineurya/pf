import { useEffect, useState } from "react";

import {
  THINKING_BORDER_SETTINGS,
  THINKING_SEQUENCE,
} from "@/exploration/thinkingBorder/thinkingBorderSettings.js";

/** Interactive thinking-border canvas — no demo frame or dock. */
export function ThinkingBorderStage({ className }) {
  const [index, setIndex] = useState(0);
  const state = THINKING_SEQUENCE[index % THINKING_SEQUENCE.length];
  const config = THINKING_BORDER_SETTINGS[state];

  /* Auto-cycle; clicking the phone advances immediately (the effect re-arms
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
          aria-label={`Assistant state: ${config.label} — activate to step to the next state`}
        >
          <span className="tbd-ring" aria-hidden />
          <span className="tbd-screen" aria-hidden>
            <span className="tbd-state-label">{config.label}</span>
            {state === "responding" ? (
              <span className="tbd-stream" key={index}>
                Here’s a plan for your afternoon —
              </span>
            ) : null}
          </span>
        </button>

        <span className="sr-only" role="status">
          {config.label}
        </span>
      </main>
    </div>
  );
}
