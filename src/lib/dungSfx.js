/** InCity row hover — kosta.fyi-style sine tick, pitched down and softened. */
let audioCtx;
let lastAt = 0;
let unlockBound = false;

function bindUnlock() {
  if (unlockBound || typeof window === "undefined") return;
  unlockBound = true;

  const unlock = () => {
    try {
      audioCtx ??= new AudioContext();
      if (audioCtx.state === "suspended") void audioCtx.resume();
    } catch {
      /* autoplay policy */
    }
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };

  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("keydown", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
}

bindUnlock();

async function ensureCtx() {
  audioCtx ??= new AudioContext();
  if (audioCtx.state === "suspended") await audioCtx.resume();
  return audioCtx.state === "running" ? audioCtx : null;
}

/** kosta.fyi hover: sine, instant attack, ~10 ms decay; deeper pitch + softer gain here. */
function blip(ctx) {
  const t = ctx.currentTime;
  const decay = 0.02;
  const release = 0.008;
  const dur = decay + release;
  const peak = 0.11;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(peak, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);
  gain.gain.setValueAtTime(0.0001, t + dur);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(720, t);
  filter.frequency.exponentialRampToValueAtTime(420, t + dur);
  filter.Q.value = 0.6;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(480, t);
  osc.frequency.exponentialRampToValueAtTime(340, t + decay);

  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.01);
}

export function playDungSfx() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  const now = performance.now();
  if (now - lastAt < 120) return;
  lastAt = now;

  void (async () => {
    try {
      const ctx = await ensureCtx();
      if (!ctx) return;
      blip(ctx);
    } catch {
      /* Web Audio unavailable */
    }
  })();
}
