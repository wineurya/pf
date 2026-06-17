export const PANEL_EASE = [0.32, 0.72, 0, 1];
export const ITEM_EASE = [0.25, 0.1, 0.25, 1];
export const ICON_MORPH_EASE = [0.32, 0.72, 0, 1];
export const STAGGER = 0.04;
export const ICON_BLUR = "blur(3px)";

export const panelVariants = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0% round 1rem)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 1rem)",
    opacity: 1,
    transition: {
      clipPath: { duration: 0.48, ease: PANEL_EASE },
      opacity: { duration: 0.28, ease: "easeOut", delay: 0.04 },
    },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0% round 1rem)",
    opacity: 0,
    transition: {
      opacity: { duration: 0.18, ease: "easeIn" },
      clipPath: { duration: 0.36, ease: [0.52, 0, 0.74, 0.18], delay: 0.03 },
    },
  },
};

export const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.06 },
  },
};

export const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ITEM_EASE },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8, filter: ICON_BLUR },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: ITEM_EASE,
      opacity: { duration: 0.4, ease: ITEM_EASE },
      y: { duration: 0.4, ease: ITEM_EASE },
      filter: { duration: 0.36, ease: ITEM_EASE },
    },
  },
};

export const iconMorphTransition = {
  opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  scale: { duration: 0.3, ease: ICON_MORPH_EASE },
  filter: { duration: 0.28, ease: ICON_MORPH_EASE },
};
