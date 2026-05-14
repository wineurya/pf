/**
 * Figma MCP font weights (SF Pro / SF Pro Rounded) — use as source of truth.
 * `fontVariationSettings` pairs with variable system fonts on Apple platforms.
 */
export const RB_FONT_VAR = { fontVariationSettings: "'wdth' 100" };

/** SF-style semibold — Figma 590; `--font-weight-emphasis` in tokens (Inter/Nunito variable support 590). */
export const rbSemibold = "font-emphasis";

/** SF-style medium — Figma 510; `--font-weight-supporting` in tokens. */
export const rbMedium = "font-supporting";

/** SF Pro Regular — Figma `font-normal` / 400 */
export const rbRegular = "font-normal";
