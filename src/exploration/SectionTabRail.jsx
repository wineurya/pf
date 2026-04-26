import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Briefcase01Icon, BookUserIcon, Layers01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { SECTION_TABS } from "@/exploration/siteContent.js";

const TAB_ICONS = [Briefcase01Icon, BookUserIcon, Layers01Icon, Mail01Icon];

const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.36;
const WX_TAB_MICRO_DURATION = 0.28;
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];
const WX_TAB_LABEL_BLUR = 4;

function handleTabListKeyDown(e, selectedIndex, onSelectSection) {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault();
  const dir = e.key === "ArrowRight" ? 1 : -1;
  const next = (selectedIndex + dir + SECTION_TABS.length) % SECTION_TABS.length;
  onSelectSection(SECTION_TABS[next].sectionId, next);
  document.getElementById(`site-tab-${SECTION_TABS[next].id}`)?.focus();
}

function labelMotionPresets(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { opacity: 1, width: "auto", marginLeft: 8 },
      exit: { opacity: 0, width: 0, marginLeft: 0 },
    };
  }
  return {
    initial: { opacity: 0, width: 0, marginLeft: 0, filter: `blur(${WX_TAB_LABEL_BLUR}px)` },
    exit: { opacity: 0, width: 0, marginLeft: 0, filter: `blur(${WX_TAB_LABEL_BLUR}px)` },
  };
}

function SectionTabPillButton({
  tab,
  i,
  selected,
  reduceMotion,
  pillT,
  microT,
  onSelectSection,
}) {
  const labelPreset = labelMotionPresets(reduceMotion);
  return (
    <motion.button
      type="button"
      role="tab"
      id={`site-tab-${tab.id}`}
      aria-selected={selected}
      aria-controls={tab.sectionId}
      aria-label={tab.label}
      tabIndex={selected ? 0 : -1}
      transition={pillT}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className={clsx(
        "wx-tab wx-text-sm relative flex min-h-10 shrink-0 items-center justify-center rounded-[var(--wx-radius-segment)] outline-none",
        "text-[var(--wx-tab-idle-fg)] px-3 py-2",
        selected ? "font-semibold" : "min-w-10 font-medium",
      )}
      onClick={() => onSelectSection(tab.sectionId, i)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 rounded-[var(--wx-radius-segment)]"
        style={{
          backgroundColor: "var(--wx-tab-idle)",
          boxShadow: "var(--wx-tab-shadow-idle)",
        }}
      />
      {selected ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[var(--wx-radius-segment)]"
          style={{
            backgroundColor: "var(--wx-primary)",
            boxShadow: "var(--wx-tab-shadow-active)",
          }}
        />
      ) : null}
      <span className="relative z-10 flex min-w-min items-center justify-center">
        <motion.span
          className="flex shrink-0 items-center justify-center"
          initial={false}
          animate={reduceMotion ? { opacity: 1 } : { opacity: selected ? 1 : 0.82 }}
          transition={microT}
        >
          <HugeiconsIcon icon={TAB_ICONS[i]} size={17} color="currentColor" strokeWidth={1.6} />
        </motion.span>
        <AnimatePresence initial={false}>
          {selected ? (
            <motion.span
              key="label"
              className="wx-tab-label-text overflow-hidden whitespace-nowrap pr-0.5 tracking-tight"
              style={{ display: "inline-block" }}
              initial={labelPreset.initial}
              animate={{
                opacity: 1,
                width: "auto",
                marginLeft: 8,
                filter: "blur(0px)",
              }}
              exit={labelPreset.exit}
              transition={pillT}
            >
              {tab.label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}

/**
 * Section tabs (Work / Studio / …) — split from the wordmark so chrome can fade or
 * transition independently in view transitions.
 */
export function SectionTabRail({
  onSelectSection,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabMicroTransition,
  tabRowRef,
}) {
  const pillT = tabPillTransition ?? { duration: reduceMotion ? 0 : WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE };
  const microT =
    tabMicroTransition ?? { duration: reduceMotion ? 0.01 : WX_TAB_MICRO_DURATION, ease: WX_TAB_EASE_IN_OUT };

  return (
    <div
      className="wx-tab-track min-w-0 max-w-full shrink overflow-x-auto overflow-y-visible overscroll-x-contain [-webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Sections"
      onKeyDown={(e) => handleTabListKeyDown(e, selectedIndex, onSelectSection)}
    >
      <div
        ref={tabRowRef}
        className="relative inline-flex w-max min-w-0 flex-nowrap items-center gap-1 py-1.5 pl-1.5 pr-2"
      >
        {SECTION_TABS.map((tab, i) => {
          const selected = selectedIndex === i;
          return (
            <SectionTabPillButton
              key={tab.id}
              tab={tab}
              i={i}
              selected={selected}
              reduceMotion={reduceMotion}
              pillT={pillT}
              microT={microT}
              onSelectSection={onSelectSection}
            />
          );
        })}
      </div>
    </div>
  );
}
