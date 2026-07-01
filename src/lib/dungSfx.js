/** Brief squelch/plop for InCity hover — ponytail: Web Audio synth; drop in a real sample if needed. */
let audioCtx;
let lastAt = 0;

export function playDungSfx() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover)").matches) return;

  const now = performance.now();
  if (now - lastAt < 400) return;
  lastAt = now;

  try {
    audioCtx ??= new AudioContext();
    if (audioCtx.state === "suspended") void audioCtx.resume();

    const t = audioCtx.currentTime;
    const dur = 0.14;

    const len = Math.floor(audioCtx.sampleRate * dur);
    const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const env = (1 - i / len) ** 1.5;
      ch[i] = (Math.random() * 2 - 1) * env;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buf;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 180;
    filter.Q.value = 0.8;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.16, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter).connect(noiseGain).connect(audioCtx.destination);
    noise.start(t);
    noise.stop(t + dur);

    const osc = audioCtx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + dur * 0.85);

    const oscGain = audioCtx.createGain();
    oscGain.gain.setValueAtTime(0.2, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.9);

    osc.connect(oscGain).connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur);
  } catch {
    /* autoplay policy or missing Web Audio */
  }
}
