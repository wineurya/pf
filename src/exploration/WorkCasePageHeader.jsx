import { TopNav } from "@/exploration/TopNav.jsx";

/**
 * Sticky top bar on work-case routes. Own component so the **header shell** (border,
 * padding, safe-area) is separate from `TopNav` and can be named or styled for
 * view transitions without touching the home layout.
 */
export function WorkCasePageHeader({
  location,
  navigate,
  onSelectSection,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabMicroTransition,
  tabRowRef,
}) {
  return (
    <header
      className="wx-explore-top-header sticky top-0 z-30 w-full shrink-0 border-b border-[color:var(--wx-border-soft)]"
      data-site-region="work-case-header"
    >
      <div className="px-[var(--wx-pad-x)] pb-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))] sm:pb-2.5">
        <TopNav
          location={location}
          navigate={navigate}
          onSelectSection={onSelectSection}
          selectedIndex={selectedIndex}
          reduceMotion={reduceMotion}
          tabPillTransition={tabPillTransition}
          tabMicroTransition={tabMicroTransition}
          tabRowRef={tabRowRef}
        />
      </div>
    </header>
  );
}
