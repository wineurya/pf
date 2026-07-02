export function jellyControlGeometry(progress, edgePull, edgeSide, handleWidthPx, trackWidthPx) {
  const p = clamp(0, progress, 1);
  const pull = clamp(0, edgePull, 1);
  /* Edge stretch anchors to the bound being pressed — progress, not stale side. */
  const side = p <= 0 ? -1 : p >= 1 ? 1 : edgeSide < 0 ? -1 : 1;
  const edgePx = pull * 14;

  // Stretch is real width, not scaleX — a scaled pill loses its round caps.
  const thumbWidth = handleWidthPx * (1 + pull * 1.45);
  const stretch = thumbWidth - handleWidthPx;
  const half = thumbWidth / 2;
  const travel = Math.max(trackWidthPx - thumbWidth, 1);
  // Shift the center back by half the growth so the outer edge stays
  // anchored and the thumb stretches toward the track interior.
  const thumbX = half + p * travel + side * (edgePx * 0.42 - stretch / 2);
  const edgeSlack = pull * 12;

  return {
    thumbX: clamp(half - edgeSlack, thumbX, trackWidthPx - half + edgeSlack),
    thumbWidth,
    thumbScaleY: 1 - pull * 0.16,
  };
}

/** Map pointer x (track-local px) to 0–1 progress matching thumb travel. */
export function progressFromPointerX(rawX, trackWidthPx, handleWidthPx) {
  const half = handleWidthPx / 2;
  const travel = Math.max(trackWidthPx - handleWidthPx, 1);
  return clamp(0, (rawX - half) / travel, 1);
}

/** Edge overflow + side for jelly pull past the thumb's resting bounds. */
export function pointerEdgeFromX(rawX, trackWidthPx, handleWidthPx) {
  const half = handleWidthPx / 2;
  const leftEdge = half;
  const rightEdge = trackWidthPx - half;
  const progress = progressFromPointerX(rawX, trackWidthPx, handleWidthPx);

  const edgeOverflow =
    rawX < leftEdge
      ? clamp(0, (leftEdge - rawX) / 80, 1)
      : rawX > rightEdge
        ? clamp(0, (rawX - rightEdge) / 80, 1)
        : 0;

  const edgeSide = progress <= 0 ? -1 : progress >= 1 ? 1 : rawX < trackWidthPx / 2 ? -1 : 1;

  return { progress, edgeOverflow, edgeSide };
}

export function progressFromValue(value, min, max) {
  return (value - min) / (max - min);
}

export function valueFromProgress(progress, min, max) {
  return min + progress * (max - min);
}

function clamp(lo, v, hi) {
  return Math.min(hi, Math.max(lo, v));
}
