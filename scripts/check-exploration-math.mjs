/* Assert-based self-check for the pure exploration math.
   Run: node scripts/check-exploration-math.mjs */
import assert from "node:assert/strict";
import { magneticPull, scrubLift, MAGNETIC_DEFAULTS, SCRUB_DEFAULTS } from "../src/exploration/magneticDock/magneticDockPhysics.js";
import { jellyControlGeometry, pointerEdgeFromX, progressFromPointerX } from "../src/exploration/jellyScrubber/jellyScrubberPhysics.js";
import {
  nearestSiteIndex,
  buildCellMask,
} from "../src/exploration/voronoiGrid/voronoiGridMath.js";

/* magnetic pull: zero outside the radius, capped near the center, pulls
   toward the cursor (same sign as the offset). */
const { radius, strength } = MAGNETIC_DEFAULTS;
assert.deepEqual(magneticPull(200, 0, radius, strength), { x: 0, y: 0, t: 0 });
assert.deepEqual(magneticPull(0, 0, radius, strength), { x: 0, y: 0, t: 1 });
const near = magneticPull(10, 0, radius, strength);
assert.ok(near.x > 0 && near.x <= strength && near.t > 0.9);
const diag = magneticPull(-50, 50, radius, strength);
assert.ok(diag.x < 0 && diag.y > 0);
/* Inner damp softens displacement only — proximity t still peaks on-icon. */
const { innerRadius, innerDamp } = MAGNETIC_DEFAULTS;
const onIcon = magneticPull(5, 0, radius, strength, innerRadius, innerDamp);
const undamped = magneticPull(5, 0, radius, strength);
assert.ok(onIcon.t === undamped.t && onIcon.x < undamped.x);

/* touch scrub: zero outside the radius, full lift (upward) directly under
   the finger, partial lift in between, symmetric either side. */
const { radius: scrubRadius, lift } = SCRUB_DEFAULTS;
assert.deepEqual(scrubLift(scrubRadius + 1, scrubRadius, lift), { y: 0, t: 0 });
assert.deepEqual(scrubLift(0, scrubRadius, lift), { y: -lift, t: 1 });
const partial = scrubLift(scrubRadius / 2, scrubRadius, lift);
assert.ok(partial.y < 0 && partial.y > -lift && partial.t > 0 && partial.t < 1);
assert.deepEqual(scrubLift(-scrubRadius / 2, scrubRadius, lift), partial);

/* jelly scrubber: thumb reaches both track edges at progress 0 and 1. */
const track = 200;
const handle = 4;
const half = handle / 2;
const left = jellyControlGeometry(0, 0, -1, handle, track);
const right = jellyControlGeometry(1, 0, 1, handle, track);
assert.equal(left.thumbX, half);
assert.equal(right.thumbX, track - half);
assert.equal(progressFromPointerX(half, track, handle), 0);
assert.equal(progressFromPointerX(track - half, track, handle), 1);
const mid = pointerEdgeFromX(track / 2, track, handle);
assert.ok(mid.progress > 0.45 && mid.progress < 0.55);

/* voronoi: nearest site wins; mask blocks map to the right site. */
const sites = [
  { x: 10, y: 10 },
  { x: 90, y: 10 },
  { x: 50, y: 90 },
];
assert.equal(nearestSiteIndex(12, 12, sites), 0);
assert.equal(nearestSiteIndex(88, 8, sites), 1);
assert.equal(nearestSiteIndex(50, 80, sites), 2);
const mask = buildCellMask(10, 10, 10, sites);
assert.equal(mask.length, 100);
assert.equal(mask[0], 0); // block center (5,5) → site 0
assert.equal(mask[9], 1); // block center (95,5) → site 1
assert.equal(mask[95], 2); // block center (55,95) → site 2

console.log("exploration math checks passed");
