import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { createGrainGradient } from "@/exploration/grainGradient/grainGradientEngine.js";

/** Ambient grain-gradient canvas — no demo frame or dock. */
export function GrainGradientStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const canvasRef = useRef(null);

  useEffect(() => {
    const engine = createGrainGradient(canvasRef.current, { reduceMotion });
    return engine.destroy;
  }, [reduceMotion]);

  return (
    <div className={className ? `ggr-root ${className}` : "ggr-root"}>
      <main
        className="ggr-stage"
        aria-label="Grain gradient — an ambient color surface, nothing is loading"
      >
        <canvas ref={canvasRef} className="ggr-canvas" aria-hidden />
      </main>
    </div>
  );
}
