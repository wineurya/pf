export function jellyControlGeometry(progress, edgePull, edgeSide, handleWidthPx, trackWidthPx) {
  const p = clamp(0, progress, 1);
  const pull = clamp(0, edgePull, 1);
  const side = edgeSide < 0 ? -1 : 1;
  const inset = 20;
  const usableWidth = Math.max(trackWidthPx - inset * 2, 1);
  const edgePx = pull * 14;
  const thumbX = inset + p * usableWidth + side * edgePx * 0.42;
  const edgeScale = 1 + pull * 1.45;

  return {
    thumbX: clamp(inset - 2, thumbX, trackWidthPx - inset + 2),
    thumbWidth: handleWidthPx,
    thumbScaleX: edgeScale,
    thumbScaleY: 1 - pull * 0.16,
    thumbOrigin: side > 0 ? "right center" : "left center",
  };
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
