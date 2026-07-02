import { useState } from "react";

import { Odometer } from "@/exploration/shared/Odometer.jsx";

/* Values chosen so consecutive steps exercise real carry: 96→104 rolls three
   columns (and grows one), 104→47 shrinks back down. */
const VALUES = [47, 82, 96, 104];

/** Interactive odometer-counter canvas — no demo frame or dock. */
export function OdometerCounterStage({ className }) {
  const [step, setStep] = useState(0);
  const value = VALUES[step % VALUES.length];

  return (
    <div className={className ? `odc-root ${className}` : "odc-root"}>
      <main className="odc-stage" aria-label="Odometer counter">
        <button
          type="button"
          className="odc-stat"
          onClick={() => setStep((s) => s + 1)}
          aria-label={`Friction score ${value} — activate to roll to the next value`}
        >
          <span className="odc-label" aria-hidden>
            Friction score
          </span>
          <Odometer className="odc-value" value={value} />
          <span className="odc-hint" aria-hidden>
            click to re-roll
          </span>
        </button>
      </main>
    </div>
  );
}
