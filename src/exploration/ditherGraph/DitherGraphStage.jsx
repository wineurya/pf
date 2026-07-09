import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { AnimatedNumber } from "@/exploration/shared/AnimatedNumber.jsx";
import {
  DITHER_METRICS,
  MORPH_MS,
  SWAP_MS,
} from "@/exploration/ditherGraph/ditherGraphData.js";
import { IconDeltaDown, IconDeltaUp } from "@/lib/icons.jsx";

const GRAPH_W = 280;
const GRAPH_H = 100;
const PAD_TOP = 8;
const LEFT_FADE = 0.26;
/* Vertical fill dies by this depth fraction — rest of the column is solid white. */
const FADE_END = 0.68;
/* Below the smallest non-zero Bayer cell — never paint accent (avoids floor speckles). */
const DENSITY_FLOOR = 1 / 16;
/* Idle shimmer — Bayer phase scrolls ~8fps so the fill feels alive without thrashing. */
const SHIMMER_FPS = 8;
const SHIMMER_SPEED = 0.018;

/* 4×4 Bayer — thresholds normalized 0–1. */
const BAYER_4 = [
  [0 / 16, 8 / 16, 2 / 16, 10 / 16],
  [12 / 16, 4 / 16, 14 / 16, 6 / 16],
  [3 / 16, 11 / 16, 1 / 16, 9 / 16],
  [15 / 16, 7 / 16, 13 / 16, 5 / 16],
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
}

function sampleSeries(series, t) {
  const n = series.length;
  if (n === 1) return series[0];
  const x = t * (n - 1);
  const i = Math.min(n - 2, Math.floor(x));
  return lerp(series[i], series[i + 1], x - i);
}

function lerpSeries(a, b, t) {
  const len = Math.max(a.length, b.length);
  const out = new Array(len);
  for (let i = 0; i < len; i += 1) {
    const ta = i / Math.max(1, len - 1);
    out[i] = lerp(sampleSeries(a, ta), sampleSeries(b, ta), t);
  }
  return out;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerpRgb(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function readFadeTarget() {
  if (typeof document === "undefined") return [255, 255, 255];
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return dark ? [23, 23, 23] : [255, 255, 255];
}

function bayerAt(x, y, ox, oy) {
  return BAYER_4[(y + oy) & 3][(x + ox) & 3];
}

/**
 * Ordered dither of an opaque soft fill. `ox`/`oy` scroll the Bayer phase so
 * the pattern drifts without changing the underlying series.
 */
function paintDitherGraph(ctx, w, h, series, accentRgb, fadeRgb, ox, oy) {
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const [ar, ag, ab] = accentRgb;
  const [fr, fg, fb] = fadeRgb;
  const plotH = h - PAD_TOP;
  const px = ox | 0;
  const py = oy | 0;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = fr;
    data[i + 1] = fg;
    data[i + 2] = fb;
    data[i + 3] = 255;
  }

  for (let x = 0; x < w; x += 1) {
    const t = x / (w - 1);
    const left = Math.min(1, t / LEFT_FADE);
    const v = sampleSeries(series, t);
    const yTop = Math.floor(PAD_TOP + (1 - v) * plotH);

    for (let y = yTop; y < h; y += 1) {
      const depth = (y - yTop) / Math.max(1, h - yTop);
      if (depth >= FADE_END) continue;
      const local = depth / FADE_END;
      const density = left * (1 - local) ** 2.6;
      if (density <= DENSITY_FLOOR) continue;
      if (density <= bayerAt(x, y, px, py)) continue;
      const i = (y * w + x) * 4;
      data[i] = ar;
      data[i + 1] = ag;
      data[i + 2] = ab;
    }

    const strokeY = Math.max(0, Math.min(h - 1, yTop));
    for (let dy = 0; dy <= 1; dy += 1) {
      const y = Math.min(h - 1, strokeY + dy);
      if (left * 0.95 > bayerAt(x, y, px, py) * 0.35) {
        const i = (y * w + x) * 4;
        data[i] = ar;
        data[i + 1] = ag;
        data[i + 2] = ab;
      }
    }
  }

  ctx.putImageData(img, 0, 0);
}

function MetricHeader({ metric }) {
  return (
    <div className="dg-head">
      <p className="dg-label">{metric.label}</p>
      <div className="dg-value-row">
        <span className="dg-value">
          <AnimatedNumber value={metric.value} />
          {metric.unit ? <span className="dg-unit">{metric.unit}</span> : null}
        </span>
        <span
          className={
            metric.delta >= 0 ? "dg-delta dg-delta--up" : "dg-delta dg-delta--down"
          }
        >
          <span className="dg-delta-arrow" aria-hidden>
            {metric.delta >= 0 ? (
              <IconDeltaUp size={12} />
            ) : (
              <IconDeltaDown size={12} />
            )}
          </span>
          <AnimatedNumber value={Math.abs(metric.delta)} />
        </span>
      </div>
    </div>
  );
}

/** Dithered metric sparkline — canvas Bayer dither with a slow phase drift. */
export function DitherGraphStage({ className }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(DITHER_METRICS[0]);
  const canvasRef = useRef(null);
  const fromRef = useRef(DITHER_METRICS[0]);
  const toRef = useRef(DITHER_METRICS[0]);
  const seriesRef = useRef(DITHER_METRICS[0].series);
  const rgbRef = useRef(hexToRgb(DITHER_METRICS[0].accent));
  const phaseRef = useRef({ x: 0, y: 0 });
  const busy = useRef(false);
  const morphRaf = useRef(0);
  const shimmerRaf = useRef(0);
  const fadeRef = useRef(readFadeTarget());

  const paint = (series, accentRgb) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.width !== GRAPH_W || canvas.height !== GRAPH_H) {
      canvas.width = GRAPH_W;
      canvas.height = GRAPH_H;
    }
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    seriesRef.current = series;
    rgbRef.current = accentRgb;
    const { x, y } = phaseRef.current;
    paintDitherGraph(
      ctx,
      GRAPH_W,
      GRAPH_H,
      series,
      accentRgb,
      fadeRef.current,
      x,
      y,
    );
  };

  const runMorph = (nextIndex) => {
    if (busy.current) return;
    const next = DITHER_METRICS[nextIndex % DITHER_METRICS.length];
    fromRef.current = toRef.current;
    toRef.current = next;
    setDisplay(next);
    setIndex(nextIndex % DITHER_METRICS.length);

    if (reduceMotion) {
      paint(next.series, hexToRgb(next.accent));
      return;
    }

    busy.current = true;
    const start = performance.now();
    const from = fromRef.current;
    const to = next;
    const fromRgb = hexToRgb(from.accent);
    const toRgb = hexToRgb(to.accent);

    const tick = (now) => {
      const t = easeInOut(Math.min(1, (now - start) / MORPH_MS));
      /* Keep the shimmer drifting through the morph. */
      phaseRef.current.x += SHIMMER_SPEED * 1.4;
      phaseRef.current.y += SHIMMER_SPEED * 0.9;
      paint(lerpSeries(from.series, to.series, t), lerpRgb(fromRgb, toRgb, t));
      if (t < 1) {
        morphRaf.current = requestAnimationFrame(tick);
      } else {
        busy.current = false;
        paint(to.series, toRgb);
      }
    };
    cancelAnimationFrame(morphRaf.current);
    morphRaf.current = requestAnimationFrame(tick);
  };

  const advance = () => runMorph(index + 1);

  /* Continuous Bayer-phase drift — the fill shimmers while idle. */
  useEffect(() => {
    if (reduceMotion) return undefined;
    let last = 0;
    const frame = (now) => {
      shimmerRaf.current = requestAnimationFrame(frame);
      if (busy.current) return;
      if (now - last < 1000 / SHIMMER_FPS) return;
      last = now;
      phaseRef.current.x += SHIMMER_SPEED;
      phaseRef.current.y += SHIMMER_SPEED * 0.65;
      paint(seriesRef.current, rgbRef.current);
    };
    shimmerRaf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(shimmerRaf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    fadeRef.current = readFadeTarget();
    paint(DITHER_METRICS[0].series, hexToRgb(DITHER_METRICS[0].accent));
    const sync = () => {
      fadeRef.current = readFadeTarget();
      paint(seriesRef.current, rgbRef.current);
    };
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => {
      obs.disconnect();
      cancelAnimationFrame(morphRaf.current);
      cancelAnimationFrame(shimmerRaf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setTimeout(advance, SWAP_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduceMotion]);

  return (
    <div
      className={className ? `dg-root ${className}` : "dg-root"}
      style={{ "--dg-accent": display.accent }}
    >
      <main className="dg-stage" aria-label="Dither metric graph">
        <button
          type="button"
          className="dg-card"
          onClick={advance}
          aria-label={`${display.label}: ${display.value}${display.unit ?? ""}. Activate to show the next metric.`}
        >
          <MetricHeader metric={display} />
          <canvas
            ref={canvasRef}
            className="dg-graph"
            width={GRAPH_W}
            height={GRAPH_H}
            aria-hidden
          />
        </button>
        <span className="sr-only" role="status">
          {display.label} {display.value}
          {display.unit ?? ""}
        </span>
      </main>
    </div>
  );
}
