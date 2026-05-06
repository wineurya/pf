/**
 * Exploration header chrome — spring-based tabs so fill, label, and icon feel physically coupled.
 */

export const WX_NAV_EASE_OUT = [0.22, 1, 0.36, 1];

/**
 * Pill + rail: shared spring for icon, fill cross-fade, and layout hints.
 */
export const WX_NAV_TAB_SPRING = { type: "spring", stiffness: 68, damping: 17, mass: 1.25 };

/**
 * Tab label width (maxWidth / margin): slow growth when a pill opens (small → wide).
 */
export const WX_NAV_TAB_LABEL_EXPAND_SPRING = {
  type: "spring",
  stiffness: 36,
  damping: 12,
  mass: 1.65,
};

/** When a tab collapses to icon-only — slightly snappier than expand. */
export const WX_NAV_TAB_LABEL_COLLAPSE_SPRING = {
  type: "spring",
  stiffness: 90,
  damping: 20,
  mass: 1,
};

export function wxNavTabTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : WX_NAV_TAB_SPRING;
}

/** Rail opacity — tween is fine; opacity doesn’t benefit from spring physics */
export const WX_NAV_RAIL_FADE_DURATION_S = 0.3;

export function wxNavRailFadeTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : { duration: WX_NAV_RAIL_FADE_DURATION_S, ease: WX_NAV_EASE_OUT };
}
