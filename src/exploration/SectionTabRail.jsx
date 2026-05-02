import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PenTool02Icon, BookUserIcon, Layers01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { SECTION_TABS } from "@/exploration/siteContent.js";

const TAB_ICONS = [PenTool02Icon, BookUserIcon, Layers01Icon, Mail01Icon];

/** ease-out exit from rest — responsive for small UI (interaction-design ~200–300ms band) */
const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.26;
const WX_TAB_LABEL_MAX_W = 200;

/** One short rotate settle when a tab becomes selected (no lateral wobble — reads calmer). */
const ICON_ACTIVATE_ROT_L = [0, -2.1, 0.65, 0];
const ICON_ACTIVATE_ROT_R = [0, 2.1, -0.65, 0];
const ICON_ACTIVATE_TIMES = [0, 0.32, 0.68, 1];
const ICON_ACTIVATE_DURATION = 0.32;

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
  if (reduceMotion) return { rotate: 0, scale: selected ? 1.03 : 1, opacity: selected ? 1 : 0.86 };
  return { rotate: 0, scale: selected ? 1.06 : 1, opacity: selected ? 1 : 0.84 };
}

function iconActivationKeyframesTransition() {
  return {
    rotate: {
      duration: ICON_ACTIVATE_DURATION,
      ease: WX_TAB_PILL_EASE,
      times: ICON_ACTIVATE_TIMES,
    },
    scale: { duration: WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE },
    opacity: { duration: WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE },
  };
}

function iconRestOnlyTransition() {
  return { duration: WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE };
}

function startIconActivationSettle(controls, rest, dir) {
  const rotKf = dir < 0 ? ICON_ACTIVATE_ROT_L : ICON_ACTIVATE_ROT_R;
  return controls.start({
    ...rest,
    rotate: rotKf,
    transition: iconActivationKeyframesTransition(),
  });
}

/** Brief rotate settle when the tab becomes selected — aligned easing, no x jitter. */
function useIconActivationSettle({ selected, dir, reduceMotion }) {
  const controls = useAnimationControls();
  const wasSelectedRef = useRef(selected);

  useEffect(() => {
    const rest = iconRestTarget({ selected, reduceMotion });

    if (reduceMotion) {
      controls.set(rest);
      wasSelectedRef.current = selected;
      return;
    }

    const becameSelected = selected && !wasSelectedRef.current;
    wasSelectedRef.current = selected;

    if (becameSelected) {
      void startIconActivationSettle(controls, rest, dir);
      return;
    }

    controls.start({
      ...rest,
      transition: iconRestOnlyTransition(),
    });
  }, [selected, dir, reduceMotion, controls]);

  return controls;
}

function SectionTabPillButton({ tab, i, selected, reduceMotion, pillT, onSelectSection }) {
  const labelPreset = labelMotionPresets(reduceMotion);
  /** Alternate wiggle start direction per tab so the row reads playful, not in lockstep. */
  const dir = i % 2 === 0 ? -1 : 1;
  const iconControls = useIconActivationSettle({ selected, dir, reduceMotion });

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
        "wx-tab wx-text-sm group relative flex min-h-10 shrink-0 items-center justify-center rounded-full outline-none",
        "text-[var(--wx-tab-idle-fg)] px-3.5 py-2",
        selected ? "font-semibold" : "min-w-10 font-medium",
      )}
      onClick={() => onSelectSection(tab.sectionId, i)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 rounded-full"
        style={{
          backgroundColor: "var(--wx-tab-idle)",
          boxShadow: "var(--wx-tab-shadow-idle)",
        }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full"
        style={{
          backgroundColor: "var(--wx-primary)",
          boxShadow: "var(--wx-tab-shadow-active)",
        }}
        initial={false}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0.01 } : { duration: 0.22, ease: WX_TAB_PILL_EASE }}
      />
      <span className="relative z-10 flex min-w-min items-center justify-center">
        <motion.span
          className="flex shrink-0 items-center justify-center will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
          initial={iconRestTarget({ selected, reduceMotion })}
          animate={iconControls}
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
  const pillT = tabPillTransition ?? { duration: reduceMotion ? 0 : WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE };

  return (
    <div
      className="wx-tab-track min-w-0 max-w-full shrink overflow-x-auto overflow-y-visible overscroll-x-contain rounded-full [-webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Sections"
      onKeyDown={(e) => handleTabListKeyDown(e, selectedIndex, onSelectSection)}
    >
      <div
        ref={tabRowRef}
        className="relative inline-flex w-max min-w-0 flex-nowrap items-center gap-0.5 py-1 pl-1 pr-1 sm:gap-1 sm:py-1 sm:pl-1 sm:pr-1.5"
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
              onSelectSection={onSelectSection}
            />
          );
        })}
      </div>
    </div>
  );
}
