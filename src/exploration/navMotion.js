/**
 * Exploration header chrome — one ease-out curve + scoped durations so tabs and rail read as one system.
 */

export const WX_NAV_EASE_OUT = [0.22, 1, 0.36, 1];

export const WX_NAV_TAB_DURATION_S = 0.26;

/** Segment: active fill crossfade, label width, icon scale/opacity */
export function wxNavTabTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : { duration: WX_NAV_TAB_DURATION_S, ease: WX_NAV_EASE_OUT };
}

/** Rail opacity — faster than empty-canvas panel fades so chrome doesn’t feel sluggish */
export const WX_NAV_RAIL_FADE_DURATION_S = 0.28;

export function wxNavRailFadeTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : { duration: WX_NAV_RAIL_FADE_DURATION_S, ease: WX_NAV_EASE_OUT };
}
