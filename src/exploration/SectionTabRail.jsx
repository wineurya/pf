import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PenTool02Icon, BookUserIcon, Layers01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { SECTION_TABS } from "@/exploration/siteContent.js";
import { wxNavTabTransition } from "@/exploration/navMotion.js";

const TAB_ICONS = [PenTool02Icon, BookUserIcon, Layers01Icon, Mail01Icon];

const WX_TAB_LABEL_MAX_W = 200;

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
      initial: { opacity: 1, maxWidth: WX_TAB_LABEL_MAX_W, marginLeft: 8 },
      exit: { opacity: 0, maxWidth: 0, marginLeft: 0 },
    };
  }
  return {
    initial: { opacity: 0, maxWidth: 0, marginLeft: 0 },
    exit: { opacity: 0, maxWidth: 0, marginLeft: 0 },
  };
}

function iconRestTarget({ selected, reduceMotion }) {
  if (reduceMotion) return { scale: selected ? 1.03 : 1, opacity: selected ? 1 : 0.86 };
  return { scale: selected ? 1.06 : 1, opacity: selected ? 1 : 0.84 };
}

function SectionTabPillButton({ tab, i, selected, reduceMotion, pillT, onSelectSection }) {
  const labelPreset = labelMotionPresets(reduceMotion);
  const iconTarget = iconRestTarget({ selected, reduceMotion });

  return (
    <motion.button
      type="button"
      role="tab"
      id={`site-tab-${tab.id}`}
      aria-selected={selected}
      aria-controls={tab.sectionId}
      aria-label={tab.label}
      tabIndex={selected ? 0 : -1}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className={clsx(
        "wx-tab wx-text-sm group relative inline-flex shrink-0 items-center justify-center outline-none",
        "text-[var(--wx-tab-idle-fg)]",
        selected ? "font-semibold" : "font-medium",
      )}
      onClick={() => onSelectSection(tab.sectionId, i)}
    >
      <span
        aria-hidden
        className="wx-tab__fill pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundColor: "var(--wx-tab-idle)",
          boxShadow: "var(--wx-tab-shadow-idle)",
        }}
      />
      <motion.span
        aria-hidden
        className="wx-tab__fill pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundColor: "var(--wx-primary)",
          boxShadow: "var(--wx-tab-shadow-active)",
        }}
        initial={false}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0.01 } : pillT}
      />
      <span className="relative z-10 flex min-w-min items-center justify-center">
        <motion.span
          className="flex shrink-0 items-center justify-center"
          style={{ transformOrigin: "50% 50%" }}
          animate={iconTarget}
          transition={pillT}
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
                maxWidth: WX_TAB_LABEL_MAX_W,
                marginLeft: 8,
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
  tabRowRef,
}) {
  const pillT = tabPillTransition ?? wxNavTabTransition(reduceMotion);

  return (
    <div
      className="wx-tab-track min-w-0 max-w-full shrink"
      role="tablist"
      aria-label="Sections"
      onKeyDown={(e) => handleTabListKeyDown(e, selectedIndex, onSelectSection)}
    >
      <div ref={tabRowRef} className="wx-tab-track__scroll relative min-w-0">
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
              onSelectSection={onSelectSection}
            />
          );
        })}
      </div>
    </div>
  );
}
