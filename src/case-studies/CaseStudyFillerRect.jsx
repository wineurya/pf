import { clsx } from "clsx";

/**
 * Rounded placeholder media frame — stands in for chapter / hero / step art until
 * final assets ship. Fill-only (no hairline border); default radius 8px (`rounded-lg`).
 *
 * Defaults to 5:4 to match prior call sites; pass `ratio` (e.g. "16/9", "4/5")
 * for variety, or `style={{ aspectRatio }}` for arbitrary values.
 */
export function CaseStudyFillerRect({ className, ratio = "5/4", rounded = "lg", style }) {
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
  return (
    <div
      className={clsx(
        "pointer-events-none w-full max-w-full select-none overflow-hidden",
        radiusClass,
        "bg-[color-mix(in_srgb,var(--wx-muted)_10%,var(--wx-page-bg))]",
        className,
      )}
      style={{ aspectRatio: ratio, ...style }}
      aria-hidden
    />
  );
}
