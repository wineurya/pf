import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { GrainGradient } from "@paper-design/shaders-react";

const FALLBACK_PALETTE = {
  colorBack: "#fcfdfd",
  colors: ["#f0f0f0", "#ffffff", "#2563eb", "#0d9488"],
};

/** Product-salience tones; back matches --exp-canvas. */
function readPalette(el) {
  const style = getComputedStyle(el);
  const pick = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
  return {
    colorBack: pick("--exp-canvas", FALLBACK_PALETTE.colorBack),
    colors: [
      pick("--surface", FALLBACK_PALETTE.colors[0]),
      pick("--color-white", FALLBACK_PALETTE.colors[1]),
      pick("--accent-features", FALLBACK_PALETTE.colors[2]),
      pick("--accent-results", FALLBACK_PALETTE.colors[3]),
    ],
  };
}

/** Attention field - a salience glow over quiet product wireframe geometry. */
export function GrainGradientStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const rootRef = useRef(null);
  const [palette, setPalette] = useState(FALLBACK_PALETTE);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const sync = () => setPalette(readPalette(root));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={className ? `ggr-root ${className}` : "ggr-root"}
    >
      <main
        className="ggr-stage"
        aria-label="Animated attention field over abstract product interface geometry"
      >
        <div className="ggr-panel" aria-hidden="true">
          <span className="ggr-wire ggr-wire--nav" />
          <span className="ggr-wire ggr-wire--hero" />
          <span className="ggr-wire ggr-wire--rail" />
          <span className="ggr-wire ggr-wire--list" />
          <span className="ggr-wire ggr-wire--cta" />
          <div className="ggr-blob">
            <GrainGradient
              className="ggr-shader"
              fit="contain"
              shape="blob"
              scale={0.78}
              softness={0.12}
              intensity={0.34}
              noise={0.72}
              speed={reduceMotion ? 0 : 0.28}
              colorBack="rgba(0,0,0,0)"
              colors={palette.colors}
            />
          </div>
          <span className="ggr-target ggr-target--primary" />
          <span className="ggr-target ggr-target--secondary" />
          <span className="ggr-target ggr-target--tertiary" />
        </div>
      </main>
    </div>
  );
}
