import { clsx } from "clsx";

/** Neutral 5:4 frame — stands in for chapter/hero/step media until final art ships. */
export function CaseStudyFillerRect({ className }) {
  return (
    <div
      className={clsx(
        "pointer-events-none w-full max-w-full select-none border border-[color:var(--wx-border-soft)] bg-[color-mix(in_srgb,var(--wx-muted)_08%,var(--wx-page-bg))]",
        "aspect-[5/4]",
        className,
      )}
      aria-hidden
    />
  );
}
