/**
 * Exploration header chrome — spring-based tabs so fill, label, and icon feel physically coupled.
 */

export const WX_NAV_EASE_OUT = [0.22, 1, 0.36, 1];

/**
 * Pill spring: k=160, d=22, m=1 → ω₀≈12.6 rad/s, ζ≈0.87 (near-critical).
 * Lower stiffness removes the fast-acceleration snap while staying responsive.
 */
export function wxNavTabTransition(reduceMotion) {
  return reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 160, damping: 22, mass: 1 };
}

/** Rail opacity — tween is fine; opacity doesn’t benefit from spring physics */
export const WX_NAV_RAIL_FADE_DURATION_S = 0.3;

export function wxNavRailFadeTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : { duration: WX_NAV_RAIL_FADE_DURATION_S, ease: WX_NAV_EASE_OUT };
}
