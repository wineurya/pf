/**
 * Exploration header chrome — spring-based tabs so fill, label, and icon feel physically coupled.
 */

export const WX_NAV_EASE_OUT = [0.22, 1, 0.36, 1];

/**
 * Pill + rail layout spring: k≈68, d≈17, m≈1.25 — slower width/icon motion than the
 * previous k=160 setup while still settling without mush.
 */
export const WX_NAV_TAB_SPRING = { type: "spring", stiffness: 68, damping: 17, mass: 1.25 };

export function wxNavTabTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : WX_NAV_TAB_SPRING;
}

/** Rail opacity — tween is fine; opacity doesn’t benefit from spring physics */
export const WX_NAV_RAIL_FADE_DURATION_S = 0.3;

export function wxNavRailFadeTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : { duration: WX_NAV_RAIL_FADE_DURATION_S, ease: WX_NAV_EASE_OUT };
}
