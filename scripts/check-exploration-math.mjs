/* Assert-based self-check for the pure exploration math.
   Run: node scripts/check-exploration-math.mjs */
import assert from "node:assert/strict";
import { rollPositions } from "../src/exploration/shared/odometerMath.js";
import { magneticPull, MAGNETIC_DEFAULTS } from "../src/exploration/magneticDock/magneticDockPhysics.js";
import { jellyControlGeometry, pointerEdgeFromX, progressFromPointerX } from "../src/exploration/jellyScrubber/jellyScrubberPhysics.js";
import {
  nearestSiteIndex,
  buildCellMask,
} from "../src/exploration/voronoiGrid/voronoiGridMath.js";

/* odometer: 9→10 must roll the ones column forward (9→10, not 9→0 backwards),
   and grow a tens column that rolls 0→1. */
assert.deepEqual(rollPositions([9], 9, 10, "10"), [1, 10]);
/* 99→100: both existing columns carry forward, new leading column rolls 0→1. */
assert.deepEqual(rollPositions([9, 9], 99, 100, "100"), [1, 10, 10]);
/* decrease rolls backwards */
assert.deepEqual(rollPositions([1, 10], 10, 9, "09"), [0, 9]);
/* unchanged digits keep their positions (stay static in the DOM) */
assert.deepEqual(rollPositions([1, 2], 12, 13, "13"), [1, 3]);

/* magnetic pull: zero outside the radius, capped near the center, pulls
   toward the cursor (same sign as the offset). */
const { radius, strength } = MAGNETIC_DEFAULTS;
assert.deepEqual(magneticPull(200, 0, radius, strength), { x: 0, y: 0, t: 0 });
const near = magneticPull(10, 0, radius, strength);
assert.ok(near.x > 0 && near.x <= strength && near.t > 0.9);
const diag = magneticPull(-50, 50, radius, strength);
assert.ok(diag.x < 0 && diag.y > 0);

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
