import { useMemo } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { SectionTabRail } from "@/exploration/SectionTabRail.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";

const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.36;
const WX_TAB_MICRO_DURATION = 0.28;
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];

export function TopNav({
  location,
  navigate,
  onSelectSection,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabMicroTransition,
  tabRowRef,
  tabRailHidden,
  tabRailFadeTransition,
}) {
  const defaultPill = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE },
    [reduceMotion],
  );
  const defaultMicro = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.01 }
        : { duration: WX_TAB_MICRO_DURATION, ease: WX_TAB_EASE_IN_OUT },
    [reduceMotion],
  );
  const pillT = tabPillTransition ?? defaultPill;
  const microT = tabMicroTransition ?? defaultMicro;
  const hideRail = Boolean(tabRailHidden);
  const railFadeT = tabRailFadeTransition ?? { duration: 0.35, ease: WX_TAB_EASE_IN_OUT };

  const rail = (
    <SectionTabRail
      onSelectSection={onSelectSection}
      selectedIndex={selectedIndex}
      reduceMotion={reduceMotion}
      tabPillTransition={pillT}
      tabMicroTransition={microT}
      tabRowRef={tabRowRef}
    />
  );

  return (
    <div className="site-vt--nav flex w-full min-w-0 flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4">
      <WordmarkLink
        location={location}
        navigate={navigate}
        onSelectSection={onSelectSection}
      />
      {reduceMotion ? (
        <div
          className={clsx("min-w-0", hideRail && "pointer-events-none opacity-0")}
          inert={hideRail ? true : undefined}
          aria-hidden={hideRail ? true : undefined}
        >
          {rail}
        </div>
      ) : (
        <motion.div
          className="min-w-0"
          initial={false}
          animate={{ opacity: hideRail ? 0 : 1 }}
          transition={railFadeT}
          inert={hideRail ? true : undefined}
          aria-hidden={hideRail ? true : undefined}
        >
          {rail}
        </motion.div>
      )}
    </div>
  );
}
