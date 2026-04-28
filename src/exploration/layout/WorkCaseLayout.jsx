import { clsx } from "clsx";

/**
 * Work-case **page shell**: same token scope as the index canvas (`site-canvas`) +
 * Figma 165-53 work-case flags. Isolated root so the **header + main** are separate children
 * for view transitions and layout experiments.
 */
export function WorkCaseLayout({ className, children }) {
  return (
    <div
      className={clsx(
        "site-canvas wx-work-case-chrome min-h-dvh w-full text-[var(--color-fg)]",
        className,
      )}
      data-site-surface="work-case"
    >
      {children}
    </div>
  );
}
