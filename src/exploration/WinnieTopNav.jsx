import { useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Briefcase01Icon, BookUserIcon, Layers01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { clsx } from "clsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { WINNIE_FIGMA_ASSETS, WINNIE_TABS } from "@/exploration/winnie-content.js";
import { MaskedFigmaIcon, WX_WORDMARK_MARK_GRADIENT } from "@/exploration/MaskedFigmaIcon.jsx";

const TAB_ICONS = [Briefcase01Icon, BookUserIcon, Layers01Icon, Mail01Icon];

const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];
const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.36;
const WX_TAB_MICRO_DURATION = 0.28;
const WX_TAB_LABEL_BLUR = 4;

/**
 * Wordmark + section tabs. On the home exploration page, `onSelectSection` scrolls;
 * on case routes, it should navigate to `/#winnie-section-*`.
 */
export function WinnieTopNav({
  location,
  navigate,
  onSelectSection,
  selectedIndex,
  reduceMotion,
  tabPillTransition,
  tabMicroTransition,
  tabRowRef,
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

  return (
    <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-3 min-h-14 sm:gap-4">
      <a
        href={location.pathname === "/" ? "#winnie-section-work" : "/"}
        className="group relative inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
        onClick={(e) => {
          if (location.pathname === "/") {
            e.preventDefault();
            onSelectSection("winnie-section-work", 0);
            return;
          }
          e.preventDefault();
          navigateWithViewTransition(navigate, "/");
        }}
      >
        <span className="flex flex-col gap-0 text-[1rem] font-medium leading-[1.12] text-[var(--wx-ink)]">
          <span className="tracking-tight">wineury</span>
          <span className="-mt-px flex items-center gap-1">
            <MaskedFigmaIcon
              src={WINNIE_FIGMA_ASSETS.logoMark}
              className="size-3 shrink-0 translate-y-px select-none"
              background={WX_WORDMARK_MARK_GRADIENT}
            />
            <span className="tracking-tight">almonte</span>
          </span>
        </span>
      </a>

      <div
        className="wx-tab-track min-w-0 max-w-full shrink overflow-x-auto overflow-y-visible overscroll-x-contain [-webkit-overflow-scrolling:touch]"
        role="tablist"
        aria-label="Sections"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          const dir = e.key === "ArrowRight" ? 1 : -1;
          const next = (selectedIndex + dir + WINNIE_TABS.length) % WINNIE_TABS.length;
          onSelectSection(WINNIE_TABS[next].sectionId, next);
          document.getElementById(`winnie-tab-${WINNIE_TABS[next].id}`)?.focus();
        }}
      >
        <div
          ref={tabRowRef}
          className="relative inline-flex w-max min-w-0 flex-nowrap items-center gap-1 py-1.5 pl-1.5 pr-2"
        >
          {WINNIE_TABS.map((tab, i) => {
            const selected = selectedIndex === i;
            return (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                id={`winnie-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={tab.sectionId}
                aria-label={tab.label}
                tabIndex={selected ? 0 : -1}
                transition={pillT}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className={clsx(
                  "wx-tab relative flex min-h-10 shrink-0 items-center justify-center rounded-[var(--wx-radius-segment)] text-sm outline-none",
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
                    <HugeiconsIcon
                      icon={TAB_ICONS[i]}
                      size={17}
                      color="currentColor"
                      strokeWidth={1.6}
                    />
                  </motion.span>
                  <AnimatePresence initial={false}>
                    {selected ? (
                      <motion.span
                        key="label"
                        className="wx-tab-label-text overflow-hidden whitespace-nowrap pr-0.5 tracking-tight"
                        style={{ display: "inline-block" }}
                        initial={
                          reduceMotion
                            ? { opacity: 1, width: "auto", marginLeft: 8 }
                            : { opacity: 0, width: 0, marginLeft: 0, filter: `blur(${WX_TAB_LABEL_BLUR}px)` }
                        }
                        animate={{
                          opacity: 1,
                          width: "auto",
                          marginLeft: 8,
                          filter: "blur(0px)",
                        }}
                        exit={
                          reduceMotion
                            ? { opacity: 0, width: 0, marginLeft: 0 }
                            : { opacity: 0, width: 0, marginLeft: 0, filter: `blur(${WX_TAB_LABEL_BLUR}px)` }
                        }
                        transition={pillT}
                      >
                        {tab.label}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
