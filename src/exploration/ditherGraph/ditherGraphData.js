/* Four metric vignettes — wiggly series, shared header layout. */

export const DITHER_METRICS = [
  {
    id: "resolved",
    label: "Resolved today",
    value: 38,
    delta: 12,
    accent: "#3b82f6",
    /* Rising with mid dips — not a straight climb. */
    series: [0.14, 0.22, 0.19, 0.31, 0.28, 0.41, 0.48, 0.44, 0.58, 0.66, 0.61, 0.79, 0.74, 0.88],
  },
  {
    id: "sessions",
    label: "Active sessions",
    value: 1204,
    delta: -48,
    accent: "#0891b2",
    series: [0.72, 0.81, 0.76, 0.88, 0.84, 0.91, 0.79, 0.86, 0.93, 0.87, 0.78, 0.82, 0.7, 0.64],
  },
  {
    id: "response",
    label: "Avg response",
    value: 142,
    unit: "ms",
    delta: -18,
    accent: "#16a34a",
    series: [0.86, 0.78, 0.81, 0.69, 0.62, 0.66, 0.54, 0.48, 0.52, 0.41, 0.36, 0.39, 0.28, 0.24],
  },
  {
    id: "tickets",
    label: "Open tickets",
    value: 27,
    delta: -9,
    accent: "#d97706",
    series: [0.68, 0.54, 0.71, 0.58, 0.49, 0.63, 0.45, 0.52, 0.38, 0.44, 0.31, 0.36, 0.26, 0.22],
  },
];

export const SWAP_MS = 4800;
export const MORPH_MS = 520;
