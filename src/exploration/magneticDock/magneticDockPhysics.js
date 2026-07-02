/* Pure falloff math for the magnetic dock — no DOM, no React. */

export const MAGNETIC_DEFAULTS = {
  radius: 100,
  strength: 8,
  /* mgd-icon is 40×40 — damp pull/scale when the pointer is on the button. */
  innerRadius: 20,
  innerDamp: 0.12,
};

export const MAGNET_SPRING = { stiffness: 320, damping: 24, mass: 0.6 };

/** Displacement toward the cursor for an element whose center is (dx, dy)
    away from the pointer. Smoothstep falloff inside `radius`, displacement
    clamped to `strength` px. Returns { x, y, t } with t the eased proximity
    (0 outside the radius, →1 at the center). */
export function magneticPull(
  dx,
  dy,
  radius,
  strength,
  innerRadius = 0,
  innerDamp = 1,
) {
  const dist = Math.hypot(dx, dy);
  if (dist >= radius || dist === 0) return { x: 0, y: 0, t: 0 };

  const linear = 1 - dist / radius;
  let t = linear * linear * (3 - 2 * linear);
  let mag = strength * t;

  if (innerRadius > 0 && dist < innerRadius) {
    const blend = dist / innerRadius;
    const damp = innerDamp + (1 - innerDamp) * blend;
    mag *= damp;
    t *= damp;
  }

  return { x: (dx / dist) * mag, y: (dy / dist) * mag, t };
}
