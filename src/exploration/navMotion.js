/**
 * Exploration header chrome — spring-based tabs so fill, label, and icon feel physically coupled.
 */

export const WX_NAV_EASE_OUT = [0.22, 1, 0.36, 1];

/**
 * Pill + rail: spring for icon scale/opacity micro-motion.
 */
export const WX_NAV_TAB_SPRING = { type: "spring", stiffness: 68, damping: 17, mass: 1.25 };

/** Springs bounce on maxWidth — bad for measured layout; use tweens below for label width. */
export const WX_NAV_TAB_LABEL_EXPAND_DURATION_S = 0.48;
export const WX_NAV_TAB_LABEL_COLLAPSE_DURATION_S = 0.26;

export const WX_NAV_TAB_LABEL_EXPAND_TWEEN = {
  maxWidth: { type: "tween", duration: WX_NAV_TAB_LABEL_EXPAND_DURATION_S, ease: WX_NAV_EASE_OUT },
  marginLeft: { type: "tween", duration: WX_NAV_TAB_LABEL_EXPAND_DURATION_S, ease: WX_NAV_EASE_OUT },
};

export const WX_NAV_TAB_LABEL_COLLAPSE_TWEEN = {
  maxWidth: { type: "tween", duration: WX_NAV_TAB_LABEL_COLLAPSE_DURATION_S, ease: WX_NAV_EASE_OUT },
  marginLeft: { type: "tween", duration: WX_NAV_TAB_LABEL_COLLAPSE_DURATION_S, ease: WX_NAV_EASE_OUT },
};

/** Rail layout follows tab widths — single ease, between expand and collapse feel */
export const WX_NAV_TAB_RAIL_LAYOUT_TWEEN = {
  type: "tween",
  duration: 0.38,
  ease: WX_NAV_EASE_OUT,
};

export function wxNavTabTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : WX_NAV_TAB_SPRING;
}

/** Rail opacity — tween is fine; opacity doesn’t benefit from spring physics */
export const WX_NAV_RAIL_FADE_DURATION_S = 0.3;

export function wxNavRailFadeTransition(reduceMotion) {
  return reduceMotion ? { duration: 0 } : { duration: WX_NAV_RAIL_FADE_DURATION_S, ease: WX_NAV_EASE_OUT };
}
