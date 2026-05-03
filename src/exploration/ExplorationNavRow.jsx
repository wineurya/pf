import { TopNav } from "@/exploration/TopNav.jsx";

export function ExplorationNavRow({
  location,
  navigate,
  onSelectSection,
  onHomeWordmarkClick,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabRowRef,
  tabRailHidden,
  tabRailFadeTransition,
}) {
  return (
    <div
      className="wx-mobile-sticky-nav flex w-full min-w-0 shrink-0 flex-row flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4"
      data-site-region="explore-header-nav"
    >
      <TopNav
        location={location}
        navigate={navigate}
        onSelectSection={onSelectSection}
        onHomeWordmarkClick={onHomeWordmarkClick}
        selectedIndex={selectedIndex}
        reduceMotion={reduceMotion}
        tabPillTransition={tabPillTransition}
        tabRowRef={tabRowRef}
        tabRailHidden={tabRailHidden}
        tabRailFadeTransition={tabRailFadeTransition}
      />
    </div>
  );
}
