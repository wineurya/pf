import { useState } from "react";

import { AnimatedNumber } from "@/exploration/shared/AnimatedNumber.jsx";

/* Values chosen so consecutive steps exercise every column move: 96→104
   changes all three digits (and grows a column), 104→47 shrinks back down. */
const VALUES = [47, 82, 96, 104];

/** Interactive number-counter canvas — no demo frame or dock. */
export function OdometerCounterStage({ className }) {
  const [step, setStep] = useState(0);
  const value = VALUES[step % VALUES.length];

  return (
    <div className={className ? `odc-root ${className}` : "odc-root"}>
      <main className="odc-stage" aria-label="Number counter">
        <button
          type="button"
          className="odc-stat"
          onClick={() => setStep((s) => s + 1)}
          aria-label={`Friction score ${value} — activate to step to the next value`}
        >
          <span className="odc-label" aria-hidden>
            Friction score
          </span>
          <AnimatedNumber className="odc-value" value={value} />
          <span className="odc-hint" aria-hidden>
            click to advance
          </span>
        </button>
      </main>
    </div>
  );
}
