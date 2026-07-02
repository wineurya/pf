import { useState } from "react";

import { rollPositions } from "@/exploration/shared/odometerMath.js";

import "./odometer.css";

/* Roll deltas are ≤9 per change, so ±10 cells always covers both the old and
   the new resting position of a strip. */
const CELL_WINDOW = 10;

/** Rolling odometer numeral. Only columns whose digit changed animate; the
    strip transform transitions on --dur-slow, which collapses to 0.01ms under
    reduced motion, so digits snap instead of rolling for free. */
export function Odometer({ value, digits, className }) {
  const safe = Math.max(0, Math.round(value));
  const text = String(safe).padStart(digits ?? 1, "0");

  const [track, setTrack] = useState(() => ({
    value: safe,
    positions: text.split("").map(Number),
  }));

  /* Adjust-state-during-render: diff the previous value into per-column roll
     positions whenever the prop changes. React re-runs the render immediately
     with the new state before committing. */
  if (track.value !== safe || track.positions.length !== text.length) {
    setTrack({
      value: safe,
      positions: rollPositions(track.positions, track.value, safe, text),
    });
  }

  return (
    <span className={className ? `odo ${className}` : "odo"}>
      <span className="odo-sr">{String(safe)}</span>
      <span className="odo-cols" aria-hidden="true">
        {track.positions.map((pos, i) => {
          const cells = [];
          for (let j = pos - CELL_WINDOW; j <= pos + CELL_WINDOW; j += 1) {
            cells.push(
              <span className="odo-cell" key={j} style={{ top: `${j}em` }}>
                {((j % 10) + 10) % 10}
              </span>,
            );
          }
          return (
            <span className="odo-col" key={track.positions.length - i}>
              <span
                className="odo-strip"
                style={{ transform: `translateY(${-pos}em)` }}
              >
                {cells}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
