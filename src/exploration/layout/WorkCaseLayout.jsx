import { clsx } from "clsx";
import { DotCursor } from "@/exploration/DotCursor.jsx";

/**
 * Work-case **page shell**: same root chrome as the home exploration canvas,
 * with a work-case flag for any route-specific polish.
 */
export function WorkCaseLayout({ reduceMotion, className, children }) {
  return (
    <div
      className={clsx(
        "site-canvas wx-exploration-root wx-work-case-chrome relative z-0 min-h-dvh w-full",
        !reduceMotion && "wx-exploration-root--custom-cursor",
        className,
      )}
      data-site-surface="work-case"
    >
      <DotCursor reduceMotion={reduceMotion} />
      <div className="wx-grain" aria-hidden />
      {children}
    </div>
  );
}
