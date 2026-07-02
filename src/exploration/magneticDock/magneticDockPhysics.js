/* Pure falloff math for the magnetic dock — no DOM, no React. */

export const MAGNETIC_DEFAULTS = {
  radius: 110,
  strength: 16,
};

export const MAGNET_SPRING = { stiffness: 320, damping: 24, mass: 0.6 };

/** Displacement toward the cursor for an element whose center is (dx, dy)
    away from the pointer. Smoothstep falloff inside `radius`, displacement
    clamped to `strength` px. Returns { x, y, t } with t the eased proximity
    (0 outside the radius, →1 at the center). */
export function magneticPull(dx, dy, radius, strength) {
  const dist = Math.hypot(dx, dy);
  if (dist >= radius || dist === 0) return { x: 0, y: 0, t: 0 };

  const linear = 1 - dist / radius;
  const t = linear * linear * (3 - 2 * linear);
  const mag = strength * t;

  return { x: (dx / dist) * mag, y: (dy / dist) * mag, t };
}
