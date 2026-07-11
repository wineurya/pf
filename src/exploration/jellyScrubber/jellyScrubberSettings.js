export const JELLY_SCRUBBER_DEFAULTS = {
  progressStiffness: 760,
  progressDamping: 58,
  edgeStiffness: 420,
  edgeDamping: 18,
  mass: 0.68,
  handleSize: 4,
  trackThickness: 18,
};

export const JELLY_PROGRESS_SPRING = (settings, reduceMotion) =>
  reduceMotion
    ? { stiffness: 1400, damping: 90, mass: 0.3, restDelta: 0.001, restSpeed: 0.01 }
    : {
        stiffness: settings.progressStiffness,
        damping: settings.progressDamping,
        mass: settings.mass,
        restDelta: 0.0008,
        restSpeed: 0.008,
      };

export const JELLY_EDGE_SPRING = (settings, reduceMotion) =>
  reduceMotion
    ? { stiffness: 1200, damping: 90, mass: 0.3, restDelta: 0.001, restSpeed: 0.01 }
    : {
        stiffness: settings.edgeStiffness,
        damping: settings.edgeDamping,
        mass: settings.mass,
        restDelta: 0.0008,
        restSpeed: 0.008,
      };
