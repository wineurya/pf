import { clsx } from "clsx";

/**
 * Rounded placeholder media frame — stands in for chapter / hero / step art until
 * final assets ship. Inspired by the Figma "Testing 10:5" right-column rhythm
 * (rounded-12, neutral fill, varied aspect ratios stacked vertically).
 *
 * Defaults to 5:4 to match prior call sites; pass `ratio` (e.g. "16/9", "4/5")
 * for variety, or `style={{ aspectRatio }}` for arbitrary values.
 */
export function CaseStudyFillerRect({ className, ratio = "5/4", rounded = "lg", style }) {
  const radiusClass =
    rounded === "xl"
      ? "rounded-2xl"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "none"
      ? "rounded-none"
      : "rounded-xl"; /* default ~12px feel */
  return (
    <div
      className={clsx(
        "pointer-events-none w-full max-w-full select-none",
        radiusClass,
        "border border-[color:var(--wx-border-soft)]",
        "bg-[color-mix(in_srgb,var(--wx-muted)_10%,var(--wx-page-bg))]",
        className,
      )}
      style={{ aspectRatio: ratio, ...style }}
      aria-hidden
    />
  );
}
