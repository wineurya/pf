/* Four metric vignettes — accent tracks series direction.
   Soft curve archetypes + light point noise (no sharp expo corners). */

export const DITHER_METRICS = [
  {
    id: "resolved",
    label: "Resolved today",
    value: 38,
    delta: 12,
    accent: "#16a34a",
    /* Soft S-curve with small stalls and recoveries. */
    series: [
      0.14, 0.16, 0.15, 0.19, 0.23, 0.28, 0.34, 0.4, 0.47, 0.54, 0.58, 0.63, 0.66, 0.65, 0.7, 0.73, 0.76,
    ],
  },
  {
    id: "sessions",
    label: "Active sessions",
    value: 1204,
    delta: 86,
    accent: "#3b82f6",
    /* Gentle compounding climb, easing near the top, mild wobble. */
    series: [
      0.18, 0.2, 0.22, 0.21, 0.26, 0.31, 0.36, 0.42, 0.48, 0.54, 0.59, 0.63, 0.66, 0.68, 0.67, 0.72, 0.76,
    ],
  },
  {
    id: "response",
    label: "Avg response",
    value: 142,
    unit: "ms",
    delta: -18,
    accent: "#d97706",
    /* Noisy high band, softer step down, then settle with flicker. */
    series: [
      0.74, 0.72, 0.76, 0.73, 0.71, 0.74, 0.7, 0.68, 0.69, 0.6, 0.56, 0.58, 0.53, 0.5, 0.52, 0.48, 0.46,
    ],
  },
  {
    id: "tickets",
    label: "Open tickets",
    value: 27,
    delta: -9,
    accent: "#e11d48",
    /* Soft burn-down — faster early, slower later, small bouncebacks. */
    series: [
      0.88, 0.82, 0.84, 0.76, 0.7, 0.72, 0.64, 0.58, 0.55, 0.5, 0.46, 0.48, 0.42, 0.38, 0.36, 0.34, 0.3,
    ],
  },
];

export const SWAP_MS = 4800;
export const MORPH_MS = 520;
