/**
 * Emil-style motion tokens — strong custom curves, UI under ~300ms, asymmetric
 * enter/exit. See .agents/skills/emil-design-eng/SKILL.md
 */

/** Strong ease-out — enters, exits, hovers (starts fast, feels responsive). */
export const EASE_OUT = [0.23, 1, 0.32, 1];

/** Strong ease-in-out — elements moving/morphing on screen. */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];

/** Drawer / sheet curve (Ionic-style). */
export const EASE_DRAWER = [0.32, 0.72, 0, 1];

export const DUR_UI = 0.26;
export const DUR_UI_EXIT = 0.18;
export const DUR_LAYOUT = 0.32;
export const DUR_REVEAL = 0.32;

/** Shared fill glide — subtle spring, no harsh bounce (Emil Apple-style). */
export const SPRING_FILL = { type: "spring", duration: 0.45, bounce: 0.12 };

export const uiEnter = (reducedMotion = false) =>
  reducedMotion ? { duration: 0.12 } : { duration: DUR_UI, ease: EASE_OUT };

export const uiExit = (reducedMotion = false) =>
  reducedMotion ? { duration: 0.1 } : { duration: DUR_UI_EXIT, ease: EASE_OUT };

export const layoutMorph = (reducedMotion = false) =>
  reducedMotion ? { duration: 0 } : { duration: DUR_LAYOUT, ease: EASE_IN_OUT };

export const fillMorph = (reducedMotion = false) =>
  reducedMotion ? { duration: 0 } : SPRING_FILL;

export const revealItem = (reducedMotion = false) => ({
  hidden: reducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: 10,
        scale: 0.98,
      },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: reducedMotion ? 0.12 : DUR_REVEAL,
      ease: EASE_OUT,
    },
  },
  exit: reducedMotion
    ? { opacity: 0, transition: { duration: 0.1 } }
    : {
        opacity: 0,
        y: 6,
        scale: 0.99,
        transition: { duration: DUR_UI_EXIT, ease: EASE_OUT },
      },
});

/** Section eyebrows — same stagger slot as RevealItem, but no blur/scale on 12px caps. */
export const revealEyebrow = (reducedMotion = false) => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.12 : 0.28,
      ease: EASE_OUT,
    },
  },
  exit: reducedMotion
    ? { opacity: 0, transition: { duration: 0.1 } }
    : {
        opacity: 0,
        y: 4,
        transition: { duration: DUR_UI_EXIT, ease: EASE_OUT },
      },
});

export const revealStagger = (reducedMotion = false) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reducedMotion ? 0.02 : 0.04,
      delayChildren: reducedMotion ? 0 : 0.03,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.012,
      staggerDirection: -1,
    },
  },
});
