/* Shape burst — celebration layer for the pricing card. The layer sits UNDER
   the plan cards (z-index 0 vs. the panel's 1), so pressing a CTA pops shapes
   out from behind the card's edges before gravity rains them back down — the
   occlusion is what makes it read as physical instead of pasted on top.

   Vanilla DOM + one shared rAF loop: ballistic arcs need per-frame
   integration, which WAAPI keyframes can't express without pre-sampling.
   No imports; colors resolve through the .bt-shape--c* classes, so the file
   lifts into other projects with just its CSS block. */

const DEG = Math.PI / 180;
const GRAVITY = 1350; /* px/s² */
const AIR = 1.1; /* exponential velocity decay, 1/s */
const SCALE_IN = 0.1; /* s to pop from 0 to full size */
const FADE = 0.38; /* s of fade-out at end of life */
const MAX_LIVE = 140; /* rapid re-presses stack bursts; cap the population */

/* Hand-drawn confetti set — mixed filled/stroked keeps the shower light. */
const SHAPE_SVGS = [
  '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="8" height="8" rx="1.5" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="3.2" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="3.9" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M6 2.4 9.9 9.3H2.1Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M6 2.4v7.2M2.4 6h7.2" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 7.9C2.8 4.6 4.4 4.4 6 6.1C7.6 7.8 9.2 7.6 10.5 4.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
];

const COLOR_COUNT = 5; /* .bt-shape--c1 … --c5 in styles.css */

let particles = [];
let rafId = null;
let lastTime = 0;

function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.032);
  lastTime = now;
  const decay = Math.exp(-AIR * dt);

  particles = particles.filter((p) => {
    p.age += dt;
    /* isConnected catches a demo unmount mid-flight — drop, don't animate. */
    if (p.age >= p.ttl || !p.el.isConnected) {
      p.el.remove();
      return false;
    }
    p.vx *= decay;
    p.vy = p.vy * decay + GRAVITY * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.spin * dt;
    /* Ease-out scale-in so shapes read as popping out, not appearing. */
    const t = Math.min(p.age / SCALE_IN, 1);
    const pop = 1 - (1 - t) * (1 - t);
    const left = p.ttl - p.age;
    p.el.style.opacity = left < FADE ? (left / FADE).toFixed(3) : "1";
    p.el.style.transform = `translate(-50%, -50%) translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.rot.toFixed(1)}deg) scale(${(p.size * pop).toFixed(3)})`;
    return true;
  });

  rafId = particles.length ? requestAnimationFrame(tick) : null;
}

/** Fire a burst from (x, y) in the layer's local px. `power` scales the
    count — the Free plan gets a modest pop, the featured plan the shower. */
export function burstShapes(layer, { x, y, power = 1 }) {
  const count = Math.round(20 * power);

  for (let i = 0; i < count; i += 1) {
    /* Mostly side-fan: the card hides steep throws until they clear its top,
       so most shapes leave through the side edges where they show at once.
       Steep throws get the extra speed they need to crest the card. */
    const steep = Math.random() < 0.3;
    const tilt = steep ? Math.random() * 24 : 26 + Math.random() * 50;
    const sign = Math.random() < 0.5 ? -1 : 1;
    const angle = (-90 + sign * tilt) * DEG;
    const speed = steep ? 700 + Math.random() * 420 : 460 + Math.random() * 440;

    const el = document.createElement("span");
    el.className = `bt-shape bt-shape--c${1 + Math.floor(Math.random() * COLOR_COUNT)}`;
    el.innerHTML = SHAPE_SVGS[Math.floor(Math.random() * SHAPE_SVGS.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = "translate(-50%, -50%) scale(0)";
    layer.appendChild(el);

    particles.push({
      el,
      x: 0,
      y: 0,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      rot: Math.random() * 360,
      spin: (260 + Math.random() * 520) * (Math.random() < 0.5 ? -1 : 1),
      size: 0.55 + Math.random() * 0.6,
      age: 0,
      ttl: 1.05 + Math.random() * 0.55,
    });
  }

  while (particles.length > MAX_LIVE) particles.shift().el.remove();

  if (rafId === null) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(tick);
  }
}
