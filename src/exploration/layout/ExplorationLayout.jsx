import { forwardRef } from "react";
import { clsx } from "clsx";
import { DotCursor } from "@/exploration/DotCursor.jsx";

/** Home: `ExplorationRoot` (surface), `ExplorationBody` (columns), `ExplorationMainPanels` (`#site-panels`). */
export function ExplorationRoot({ reduceMotion, children, className, ...rootProps }) {
  return (
    <div
      className={clsx(
        "site-canvas wx-exploration-root relative z-0 min-h-dvh",
        !reduceMotion && "wx-exploration-root--custom-cursor",
        className,
      )}
      data-site-surface="explore-home"
      {...rootProps}
    >
      <DotCursor reduceMotion={reduceMotion} />
      <div className="wx-grain" aria-hidden />
      {children}
    </div>
  );
}

export function ExplorationBody({ children, className }) {
  return (
    <div
      className={clsx("relative z-[2] flex w-full min-h-dvh flex-col lg:min-h-0 lg:flex-row", className)}
      data-site-body="split"
    >
      {children}
    </div>
  );
}

export const ExplorationMainPanels = forwardRef(function ExplorationMainPanels(
  { as: Component = "div", children, className, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={clsx(
        "site-vt--panels relative z-10 flex w-full min-w-0 shrink-0 flex-col gap-[var(--wx-gallery-gap)] px-[var(--wx-pad-x)] pb-20 pt-10 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-3 lg:pl-3 lg:pr-[var(--wx-pad-x)] lg:pb-24 lg:pt-12",
        className,
      )}
      id="site-panels"
      data-site-region="panels"
      {...rest}
    >
      {children}
    </Component>
  );
});
ExplorationMainPanels.displayName = "ExplorationMainPanels";
