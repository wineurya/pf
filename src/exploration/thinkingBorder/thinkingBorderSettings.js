/* Per-state edge-glow config for the thinking border. Distinct states get
   distinct motion/color qualities, not one generic pulse: hue in degrees,
   sweep period + blur for the conic ring, glow opacity, and how long the
   auto-cycle holds the state before advancing. */

export const THINKING_SEQUENCE = ["idle", "listening", "thinking", "responding"];

export const THINKING_BORDER_SETTINGS = {
  idle: {
    label: "Idle",
    hue: 220,
    speed: 14,
    blur: 10,
    glow: 0.4,
    hold: 2200,
  },
  listening: {
    label: "Listening…",
    hue: 200,
    speed: 6,
    blur: 13,
    glow: 0.85,
    hold: 2600,
  },
  thinking: {
    label: "Thinking…",
    hue: 275,
    speed: 2.4,
    blur: 17,
    glow: 1,
    hold: 3000,
  },
  responding: {
    label: "Responding",
    hue: 152,
    speed: 4.5,
    blur: 12,
    glow: 0.9,
    hold: 3800,
  },
};
