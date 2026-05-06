import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PenTool02Icon, BookUserIcon, Layers01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { SECTION_TABS } from "@/exploration/siteContent.js";
import { wxNavTabTransition } from "@/exploration/navMotion.js";

const TAB_ICONS = [PenTool02Icon, BookUserIcon, Layers01Icon, Mail01Icon];

const WX_TAB_LABEL_MAX_W = 160;

/** Selected pill fill — cycles the brand accent family (not blue-only). */
const TAB_SELECTED_ACCENTS = [
  "var(--wx-primary)",
  "var(--wx-accent-violet)",
  "var(--wx-accent-teal)",
  "var(--wx-accent-amber)",
];

// k=200, d=20, m=0.8 → ω₀≈15.8 rad/s, ζ≈0.79
const LETTER_SPRING = { type: "spring", stiffness: 200, damping: 20, mass: 0.8 };

// Letters slide in from the right (x: 4 → 0), exit rightward (0 → x: 4).
// Using always-mounted variants (no AnimatePresence) eliminates the race
// condition where fast tab-switching leaves text stuck mid-animation.
const LETTER_VARIANTS = {
  hidden: { opacity: 0, x: 4 },
  show: { opacity: 1, x: 0, transition: LETTER_SPRING },
};

const LABEL_VARIANTS = {
  hidden: {
    maxWidth: 0,
    marginLeft: 0,
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
  show: {
    maxWidth: WX_TAB_LABEL_MAX_W,
    marginLeft: 8,
    transition: { staggerChildren: 0.035, delayChildren: 0.02 },
  },
};

function handleTabListKeyDown(e, selectedIndex, onSelectSection) {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault();
  const dir = e.key === "ArrowRight" ? 1 : -1;
  const next = (selectedIndex + dir + SECTION_TABS.length) % SECTION_TABS.length;
  onSelectSection(SECTION_TABS[next].sectionId, next);
  document.getElementById(`site-tab-${SECTION_TABS[next].id}`)?.focus();
}

function iconRestTarget({ selected, reduceMotion }) {
  if (reduceMotion) return { scale: selected ? 1.03 : 1, opacity: selected ? 1 : 0.86 };
  return { scale: selected ? 1.06 : 1, opacity: selected ? 1 : 0.84 };
}

function SectionTabPillButton({ tab, i, selected, reduceMotion, pillT, onSelectSection }) {
  const iconTarget = iconRestTarget({ selected, reduceMotion });
  const labelState = selected ? "show" : "hidden";
  const selectedAccent = TAB_SELECTED_ACCENTS[i % TAB_SELECTED_ACCENTS.length];

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
      style={{ "--wx-tab-accent": selectedAccent }}
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
          backgroundColor: "var(--wx-tab-accent)",
          boxShadow: "0 0 0 1px var(--wx-tab-accent)",
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

        {/* Label always mounted — avoids AnimatePresence race on fast clicks */}
        <motion.span
          className="wx-tab-label-text overflow-hidden whitespace-nowrap pr-0.5 tracking-tight"
          style={{ display: "inline-block" }}
          variants={LABEL_VARIANTS}
          initial={false}
          animate={labelState}
        >
          {reduceMotion ? (
            selected ? tab.label : null
          ) : (
            tab.label.split("").map((char, idx) => (
              <motion.span
                key={idx}
                variants={LETTER_VARIANTS}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))
          )}
        </motion.span>
      </span>
    </motion.button>
  );
}

export function SectionTabRail({
  onSelectSection,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabRowRef,
}) {
  const pillT = tabPillTransition ?? wxNavTabTransition(reduceMotion);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 160, damping: 22, mass: 1 }}
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
    </motion.div>
  );
}
