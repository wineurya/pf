import { clsx } from "clsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

/**
 * Segmented light / dark control (Retune-style capsule).
 */
export function RebuildThemeToggle({ mode, onLight, onDark }) {
  const reduceMotion = useReducedMotion();
  const isDark = mode === "dark";

  return (
    <div
      className={clsx(
        "inline-flex rounded-[999px] border p-0.5",
        "border-[var(--wx-border-muted)] bg-[var(--wx-surface-soft)]",
      )}
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        aria-pressed={!isDark}
        onClick={onLight}
        className={clsx(
          "relative rounded-[999px] px-3.5 py-1.5 font-[family-name:var(--font-body)] text-xs font-semibold outline-offset-2 transition-[background-color,color,box-shadow] duration-200 ease-out sm:px-4 sm:text-[13px]",
          !isDark
            ? "bg-[var(--wx-white)] text-[var(--wx-ink)] shadow-[0_1px_2px_color-mix(in_srgb,var(--wx-black)_8%,transparent)]"
            : "text-[var(--wx-muted)] hover:text-[var(--wx-ink)]",
        )}
        style={{ transitionDuration: reduceMotion ? "0ms" : undefined }}
      >
        Light
      </button>
      <button
        type="button"
        aria-pressed={isDark}
        onClick={onDark}
        className={clsx(
          "relative rounded-[999px] px-3.5 py-1.5 font-[family-name:var(--font-body)] text-xs font-semibold outline-offset-2 transition-[background-color,color,box-shadow] duration-200 ease-out sm:px-4 sm:text-[13px]",
          isDark
            ? "bg-[var(--wx-white)] text-[var(--wx-ink)] shadow-[0_1px_2px_color-mix(in_srgb,var(--wx-black)_8%,transparent)]"
            : "text-[var(--wx-muted)] hover:text-[var(--wx-ink)]",
        )}
        style={{ transitionDuration: reduceMotion ? "0ms" : undefined }}
      >
        Dark
      </button>
    </div>
  );
}
