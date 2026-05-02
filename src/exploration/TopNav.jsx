import { motion } from "motion/react";
import { clsx } from "clsx";
import { SectionTabRail } from "@/exploration/SectionTabRail.jsx";
import { WordmarkLink } from "@/exploration/WordmarkLink.jsx";
import { wxNavRailFadeTransition, wxNavTabTransition } from "@/exploration/navMotion.js";

export function TopNav({
  location,
  navigate,
  onSelectSection,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabRowRef,
  tabRailHidden,
  tabRailFadeTransition,
}) {
  const pillT = tabPillTransition ?? wxNavTabTransition(reduceMotion);
  const hideRail = Boolean(tabRailHidden);
  const railFadeT = tabRailFadeTransition ?? wxNavRailFadeTransition(reduceMotion);

  const rail = (
    <SectionTabRail
      onSelectSection={onSelectSection}
      selectedIndex={selectedIndex}
      reduceMotion={reduceMotion}
      tabPillTransition={pillT}
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
