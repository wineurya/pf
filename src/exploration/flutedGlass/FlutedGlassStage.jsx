import { useEffect, useId, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

/* Max displacement in px — the "frosted" resting state. 0 = fully clear. */
const FLUTE_SCALE = 26;
const REVEAL_HOLD_MS = 2600;
const REVEAL_EASE = [0.23, 1, 0.32, 1];

function GlassContent({ className, style }) {
  return (
    <div className={className} style={style} aria-hidden>
      <span className="fgl-kicker">Arriving</span>
      <span className="fgl-title">Fluted glass</span>
      <span className="fgl-body">
        content resolves to clarity — never a broken gray box
      </span>
    </div>
  );
}

/** Fluted-glass reveal canvas — no demo frame or dock. */
export function FlutedGlassStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const filterId = `fgl-ribs-${useId().replace(/:/g, "")}`;
  const dispRef = useRef(null);
  const scaleRef = useRef(FLUTE_SCALE);
  const [hovered, setHovered] = useState(false);
  const [looped, setLooped] = useState(false);

  /* Idle loop keeps the card demonstrating itself; hover takes over. Under
     reduced motion the loop would strobe (swaps are instant), so it's off
     and only hover/focus reveals. */
  useEffect(() => {
    if (reduceMotion || hovered) return undefined;
    const id = window.setInterval(() => setLooped((r) => !r), REVEAL_HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, hovered]);

  const clear = hovered || looped;

  useEffect(() => {
    if (reduceMotion) {
      /* Never tween the displacement — hold the frosted state; the reveal is
         the opacity cross-fade onto the clear layer below. */
      dispRef.current?.setAttribute("scale", String(FLUTE_SCALE));
      return undefined;
    }

    const controls = animate(scaleRef.current, clear ? 0 : FLUTE_SCALE, {
      duration: 0.9,
      ease: REVEAL_EASE,
      onUpdate: (value) => {
        scaleRef.current = value;
        dispRef.current?.setAttribute("scale", String(value));
      },
    });
    return () => controls.stop();
  }, [clear, reduceMotion]);

  return (
    <div className={className ? `fgl-root ${className}` : "fgl-root"}>
      <main className="fgl-stage" aria-label="Fluted glass reveal — ribbed distortion resolving to clear content">
        <svg className="fgl-defs" aria-hidden focusable="false">
          {/* Per-axis baseFrequency: dense along x, near-flat along y = vertical
              ribs, not noise. Region pinned to the element box — the default
              filter bounds overdraw ~10% on every side, which mobile GPUs pay
              for. */}
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.11 0.004"
              numOctaves="1"
              seed="7"
              result="ribs"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="ribs"
              scale={FLUTE_SCALE}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <div
          className="fgl-panel"
          data-clear={clear || undefined}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <GlassContent
            className="fgl-layer fgl-layer--glass"
            style={{ filter: `url(#${filterId})` }}
          />
          {reduceMotion ? (
            <GlassContent className="fgl-layer fgl-layer--clear" />
          ) : null}
        </div>
      </main>
    </div>
  );
}
