/* Pure geometry for the Voronoi hit-test grid — no DOM, no React. */

/** Index of the site closest to (px, py). Points and sites share units
    (pixels, so cells reflect the rendered layout, not the normalized one). */
export function nearestSiteIndex(px, py, sites) {
  let best = -1;
  let bestDist = Infinity;
  for (let i = 0; i < sites.length; i += 1) {
    const dx = px - sites[i].x;
    const dy = py - sites[i].y;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

/** Downsampled nearest-site lookup: one entry per block of a cols×rows grid.
    ponytail: brute force per block is O(cells × sites) — fine for ≤7 sites on
    a coarse grid; a real Fortune's algorithm is the upgrade path if sites
    ever grow into the hundreds. */
export function buildCellMask(cols, rows, blockSize, sites) {
  const mask = new Int8Array(cols * rows);
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      mask[y * cols + x] = nearestSiteIndex(
        (x + 0.5) * blockSize,
        (y + 0.5) * blockSize,
        sites,
      );
    }
  }
  return mask;
}
