/* Canvas loop for the grain gradient — soft radial blobs drifting over paper
   with an animated grain overlay. Plain 2D compositing, no shader language.
   The canvas renders at half resolution and upscales, so the blobs come out
   soft by construction without a blur pass. */

/* Per-blob orbit definitions in relative units of the canvas box. */
const BLOBS = [
  { color: 0, radius: 0.72, cx: 0.32, cy: 0.36, ax: 0.16, ay: 0.12, fx: 1.0, fy: 1.3, phase: 0.0 },
  { color: 1, radius: 0.64, cx: 0.7, cy: 0.6, ax: 0.14, ay: 0.16, fx: 0.8, fy: 1.1, phase: 2.1 },
  { color: 2, radius: 0.58, cx: 0.5, cy: 0.82, ax: 0.18, ay: 0.1, fx: 1.2, fy: 0.7, phase: 4.2 },
];

const DRIFT_SPEED = 0.00012; // radians per ms — slow ambient drift
const GRAIN_ALPHA = 0.07;
const PALETTE_REFRESH_FRAMES = 90; // picks up light/dark theme flips mid-view

function makeGrainTile(size = 96) {
  const tile = document.createElement("canvas");
  tile.width = size;
  tile.height = size;
  const ctx = tile.getContext("2d");
  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const shade = Math.random() < 0.5 ? 0 : 255;
    image.data[i] = shade;
    image.data[i + 1] = shade;
    image.data[i + 2] = shade;
    image.data[i + 3] = Math.random() * 255;
  }
  ctx.putImageData(image, 0, 0);
  return tile;
}

/* Blob hues come from the case-study accent tokens so the surface follows the
   design system (and the dark theme) instead of hardcoding a palette here. */
function readPalette(canvas) {
  const style = getComputedStyle(canvas);
  const read = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
  return {
    paper: read("--color-white", "#ffffff"),
    colors: [
      read("--accent-features", "#2563eb"),
      read("--accent-personas", "#db2777"),
      read("--accent-overview", "#d97706"),
    ],
  };
}

export function createGrainGradient(canvas, { reduceMotion = false } = {}) {
  const ctx = canvas.getContext("2d");
  const grain = makeGrainTile();
  let palette = readPalette(canvas);
  let raf = 0;
  let frame = 0;

  const draw = (now) => {
    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    const t = now * DRIFT_SPEED;

    ctx.globalAlpha = 1;
    ctx.fillStyle = palette.paper;
    ctx.fillRect(0, 0, width, height);

    const span = Math.max(width, height);
    for (const blob of BLOBS) {
      const x = (blob.cx + Math.sin(t * blob.fx + blob.phase) * blob.ax) * width;
      const y = (blob.cy + Math.cos(t * blob.fy + blob.phase) * blob.ay) * height;
      const r = blob.radius * span;
      const color = palette.colors[blob.color];
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
      /* 8-digit hex keeps the fade in the blob's own hue — fading to
         `transparent` would drag the ramp through black. */
      gradient.addColorStop(0, `${color}66`);
      gradient.addColorStop(1, `${color}00`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    /* Animated grain: re-offset the static tile each frame. Under reduced
       motion draw() only runs once, so the grain holds still for free. */
    ctx.globalAlpha = GRAIN_ALPHA;
    ctx.fillStyle = ctx.createPattern(grain, "repeat");
    ctx.save();
    ctx.translate(
      reduceMotion ? 0 : Math.floor(Math.random() * grain.width),
      reduceMotion ? 0 : Math.floor(Math.random() * grain.height),
    );
    ctx.fillRect(-grain.width, -grain.height, width + grain.width * 2, height + grain.height * 2);
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const loop = (now) => {
    frame += 1;
    if (frame % PALETTE_REFRESH_FRAMES === 0) palette = readPalette(canvas);
    draw(now);
    raf = window.requestAnimationFrame(loop);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round((rect.width * dpr) / 2));
    canvas.height = Math.max(1, Math.round((rect.height * dpr) / 2));
    /* ponytail: frozen frame ignores later theme flips until next mount —
       repaint-on-theme would need a MutationObserver for one rare case. */
    if (reduceMotion) draw(performance.now());
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  if (!reduceMotion) raf = window.requestAnimationFrame(loop);

  return {
    destroy() {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    },
  };
}
