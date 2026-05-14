import { clsx } from "clsx";

/** Maps data ratios like `16/9` or `16/8.5` to CSS `aspect-ratio` syntax. */
function ratioToCssAspectValue(ratio) {
  if (!ratio || typeof ratio !== "string") return undefined;
  const parts = ratio.split("/").map((s) => s.trim());
  if (parts.length !== 2) return ratio;
  return `${parts[0]} / ${parts[1]}`;
}

/**
 * Rounded placeholder media frame — stands in for chapter / hero / step art until
 * final assets ship. Fill-only (no hairline border); default radius 8px (`rounded-lg`).
 *
 * Defaults to 5:4 to match prior call sites; pass `ratio` (e.g. "16/9", "4/5")
 * for variety, or `style={{ aspectRatio }}` for arbitrary values.
 * `fillHeight` drops aspect ratio so the block can grow to the row's stretch height.
 */
export function CaseStudyFillerRect({
  className,
  ratio = "5/4",
  rounded = "lg",
  style,
  fillHeight = false,
}) {
  const radiusClass =
    rounded === "none"
      ? "rounded-none"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "xl"
      ? "rounded-xl"
      : rounded === "2xl"
      ? "rounded-2xl"
      : "rounded-lg"; /* default `lg` = 8px */
  const arToken = ratioToCssAspectValue(ratio);
  return (
    <div
      className={clsx(
        "wx-case-filler-rect pointer-events-none w-full max-w-full select-none overflow-hidden",
        fillHeight && "min-h-0 flex-1",
        radiusClass,
        "bg-[color-mix(in_srgb,var(--wx-muted)_10%,var(--wx-page-bg))]",
        className,
      )}
      style={
        fillHeight
          ? {
              ...(arToken ? { ["--wx-case-filler-ar"]: arToken } : {}),
              ...style,
            }
          : { aspectRatio: ratio, ...style }
      }
      data-case-filler-fill-height={fillHeight || undefined}
      aria-hidden
    />
  );
}
