import { useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";
import { SITE_CONTACT_SOCIALS } from "@/exploration/siteContent.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { REBUILD_ASSETS, REBUILD_WORDMARK_DOT_GRADIENT } from "@/rebuild/data/assets.js";
import { RB_FONT_VAR, rbRegular, rbSemibold } from "@/rebuild/rebuildTypography.js";

/** Node 320:396 — Frame 43. Tab accents + “clear” gradient from Figma MCP. */
const CLEAR_GRADIENT =
  "linear-gradient(125.29339608789654deg, rgb(37, 99, 235) 0%, rgb(124, 58, 237) 48%, rgb(13, 148, 136) 78%, rgb(217, 119, 6) 100%)";

/** Top highlight on filled CTAs — uses `--wx-white` so dark theme stays on-token. */
export const CTA_SURFACE_GLOSS =
  "linear-gradient(180deg, color-mix(in srgb, var(--wx-white) 14%, transparent) 0%, transparent 100%)";

const SECTION_TABS = [
  {
    id: "rebuild-work",
    label: "Work",
    nodeId: "320:476",
    collapsedClass: "w-[42.66px] max-sm:w-[38px]",
    sectionTint: "rgb(37, 99, 235)",
    accentBorder: "#1e3a8a",
    accentBg: `${CTA_SURFACE_GLOSS}, linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)`,
    icon: REBUILD_ASSETS.navIconWork,
    iconBox: "h-[17px] w-[17px]",
  },
  {
    id: "rebuild-studio",
    label: "Studio",
    nodeId: "320:485",
    collapsedClass: "w-[42.67px] max-sm:w-[38px]",
    sectionTint: "rgb(124, 58, 237)",
    accentBorder: "rgb(91, 33, 182)",
    accentBg: `${CTA_SURFACE_GLOSS}, linear-gradient(90deg, rgb(124, 58, 237) 0%, rgb(124, 58, 237) 100%)`,
    icon: REBUILD_ASSETS.navIconStudio,
    iconBox: "h-[17.03px] w-[17.03px]",
  },
  {
    id: "rebuild-process",
    label: "Process",
    nodeId: "320:495",
    collapsedClass: "w-[42.67px] max-sm:w-[38px]",
    sectionTint: "rgb(13, 148, 136)",
    accentBorder: "rgb(15, 118, 110)",
    accentBg: `${CTA_SURFACE_GLOSS}, linear-gradient(90deg, rgb(13, 148, 136) 0%, rgb(13, 148, 136) 100%)`,
    icon: REBUILD_ASSETS.navIconProcess,
    iconBox: "h-[17px] w-[17px]",
  },
  {
    id: "rebuild-contact",
    label: "Contact",
    nodeId: "320:504",
    collapsedClass: "w-[42.67px] max-sm:w-[38px]",
    sectionTint: "rgb(217, 119, 6)",
    accentBorder: "rgb(180, 83, 9)",
    accentBg: `${CTA_SURFACE_GLOSS}, linear-gradient(90deg, rgb(217, 119, 6) 0%, rgb(217, 119, 6) 100%)`,
    icon: REBUILD_ASSETS.navIconContact,
    iconBox: "h-[18.02px] w-[18.02px]",
  },
];

function sectionTintForTabId(tabId) {
  return SECTION_TABS.find((t) => t.id === tabId)?.sectionTint ?? "var(--wx-ink)";
}

const TAB_LAYOUT_SPRING = { type: "spring", stiffness: 210, damping: 36, mass: 1.05 };
const TAB_SWAP_EASE = [0.19, 0.88, 0.34, 1];
const TAB_BLUR_PX = "blur(2.5px)";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function socialHref(figmaLabel) {
  const map = { LinkedIn: "LinkedIn", Resume: "Résumé", Email: "Email" };
  const key = map[figmaLabel];
  return SITE_CONTACT_SOCIALS.find((s) => s.label === key)?.href ?? "#";
}

function emailHref() {
  return SITE_CONTACT_SOCIALS.find((s) => s.label === "Email")?.href ?? "#";
}

const REBUILD_SOCIAL_LINKS = [
  { node: "329:357", label: "LinkedIn", textNode: "329:358" },
  { node: "329:359", label: "Resume", textNode: "329:360" },
  { node: "329:368", label: "Email", textNode: "329:369" },
];

/**
 * Bottom socials: flat fills tinted from scroll-spy section (same mapping as tabs).
 */
export function AsideSocialRail({ activeSectionId }) {
  const tint = sectionTintForTabId(activeSectionId);
  return (
    <div
      className="relative w-full min-w-0"
      data-node-id="329:356"
      style={{ "--rebuild-social-tint": tint }}
    >
      <div className="relative z-[1] flex w-full min-w-0 items-stretch gap-2.5 max-sm:gap-3 sm:gap-3">
        {REBUILD_SOCIAL_LINKS.map(({ node, label, textNode }) => (
          <a
            key={label}
            href={socialHref(label)}
            className={clsx(
              "relative flex min-h-[36px] min-w-0 flex-1 basis-0 items-center justify-center overflow-hidden rounded-[8px]",
              "bg-[var(--wx-white)] text-[14px] font-semibold leading-[0] text-[var(--wx-ink)]",
              "transition-[background-color] duration-300 ease-[cubic-bezier(0.19,0.88,0.34,1)]",
              "hover:bg-[color-mix(in_srgb,var(--rebuild-social-tint)_12%,var(--wx-white))]",
              "focus-visible:outline-none focus-visible:bg-[color-mix(in_srgb,var(--rebuild-social-tint)_12%,var(--wx-white))]",
              "focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]",
              rbSemibold,
            )}
            style={{
              fontFamily: "var(--font-body)",
              ...RB_FONT_VAR,
            }}
            data-node-id={node}
            {...(label === "LinkedIn" ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="relative z-10 whitespace-nowrap px-3 py-1.5 text-center" data-node-id={textNode}>
              <span className="leading-[20px]">{label}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function WordmarkDot() {
  const url = REBUILD_ASSETS.wordmarkDotMask;
  return (
    <div className="relative size-3 shrink-0">
      <div
        className="absolute left-0 top-0 size-3"
        style={{
          backgroundImage: REBUILD_WORDMARK_DOT_GRADIENT,
          maskImage: `url('${url}')`,
          WebkitMaskImage: `url('${url}')`,
          maskSize: "12px 12px",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
        aria-hidden
      />
    </div>
  );
}

/**
 * Hero glow frame — intentionally a no-op. A baked-in white radial wash used to
 * sit behind the headline; it read as a stray drop shadow in light mode and a
 * harsh spotlight in dark mode. Kept as a named component so the JSX site stays
 * declarative and we can re-introduce a tokenized halo later if we want.
 */
function HeroGlowFrames() {
  return null;
}

/** Wordmark + section tabs — used in-page (mobile sticky) and inside aside (desktop). */
export function RebuildAsideNav({ active }) {
  const reduceMotion = useReducedMotion();
  const onTabKeyDown = useCallback((e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + SECTION_TABS.length) % SECTION_TABS.length;
    scrollToSection(SECTION_TABS[next].id);
    e.currentTarget.parentElement?.querySelectorAll("button")[next]?.focus();
  }, []);

  const layoutTransition = reduceMotion ? { duration: 0 } : TAB_LAYOUT_SPRING;
  const tabSwapTransition = reduceMotion
    ? { duration: 0 }
    : {
        opacity: { duration: 0.34, ease: TAB_SWAP_EASE },
        filter: { duration: 0.4, ease: TAB_SWAP_EASE },
      };

  return (
    <div
      className="flex w-full min-w-0 shrink-0 items-center justify-between gap-4 max-sm:gap-6 sm:gap-6"
      data-node-id="320:520"
    >
      <div className="flex min-w-0 shrink-0 flex-col items-start justify-center" data-node-id="320:420">
        <div className="flex w-full items-center justify-between" data-node-id="320:421">
          <div
            className={clsx(
              "flex shrink-0 flex-col justify-center text-[16px] leading-[0] text-[var(--wx-ink)]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            data-node-id="320:422"
          >
            <p className="m-0 leading-[17.92px]">wineury</p>
          </div>
          <div className="relative flex shrink-0 items-start pt-px" data-node-id="320:450">
            <WordmarkDot />
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col items-start" data-node-id="320:423">
          <div className="flex shrink-0 items-center gap-1" data-node-id="320:424">
            <div className="relative flex shrink-0 items-start pt-px" data-node-id="320:425">
              <WordmarkDot />
            </div>
            <div className="relative flex shrink-0 flex-col items-start" data-node-id="320:447">
              <div
                className={clsx(
                  "flex shrink-0 flex-col justify-center text-[16px] leading-[0] text-[var(--wx-ink)]",
                  rbSemibold,
                )}
                style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
                data-node-id="320:448"
              >
                <p className="m-0 leading-[17.92px]">almonte</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex min-w-0 flex-1 flex-col items-end min-[1432px]:flex-none min-[1432px]:shrink-0 min-[1432px]:items-start"
        data-node-id="320:473"
      >
        <div
          className="relative flex w-fit max-w-full shrink-0 flex-col items-start overflow-hidden rounded-[12px] border border-[var(--wx-border-soft)] bg-[color-mix(in_srgb,var(--wx-ink)_5.5%,var(--wx-white))] p-1 backdrop-blur-[2px]"
          data-node-id="320:474"
        >
          <div className="relative w-full shrink-0 rounded-[8px]" data-node-id="320:475">
            <div
              className="relative flex size-full items-center justify-start gap-[3px] overflow-hidden border-0 border-transparent bg-clip-padding p-0"
              role="tablist"
              aria-label="Page sections"
              aria-orientation="horizontal"
            >
              {SECTION_TABS.map((tab, i) => {
                const selected = active === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    layout
                    type="button"
                    role="tab"
                    aria-label={tab.label}
                    aria-selected={selected}
                    aria-controls={tab.id}
                    tabIndex={selected ? 0 : -1}
                    data-node-id={tab.nodeId}
                    data-name={tab.label}
                    onClick={() => scrollToSection(tab.id)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    transition={{ layout: layoutTransition }}
                    className={clsx(
                      "relative flex h-[38px] shrink-0 items-center justify-center overflow-hidden rounded-[8px]",
                      selected ? "min-w-0 px-3 max-sm:px-2.5" : tab.collapsedClass,
                    )}
                  >
                    <span className="absolute inset-0 rounded-[8px] bg-[#a3a3a3]" aria-hidden />
                    <motion.span
                      className="absolute inset-0 rounded-[8px]"
                      aria-hidden
                      initial={false}
                      animate={{ opacity: selected ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.26, ease: TAB_SWAP_EASE }}
                      style={{ backgroundImage: tab.accentBg }}
                    />
                    <AnimatePresence initial={false} mode="popLayout">
                      {selected ? (
                        <motion.span
                          key={`${tab.id}-title`}
                          layout
                          initial={reduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: TAB_BLUR_PX }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: TAB_BLUR_PX }}
                          transition={{
                            ...tabSwapTransition,
                            layout: layoutTransition,
                          }}
                          className={clsx(
                            "relative z-10 flex max-w-[160px] min-w-0 items-center justify-center overflow-hidden whitespace-nowrap text-center text-[14px] font-medium leading-none text-white",
                            rbRegular,
                          )}
                          style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
                        >
                          {tab.label}
                        </motion.span>
                      ) : (
                        <motion.span
                          key={`${tab.id}-icon`}
                          layout
                          aria-hidden
                          className="relative z-10 flex shrink-0 flex-col items-center justify-center"
                          initial={reduceMotion ? false : { opacity: 0, filter: TAB_BLUR_PX }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: TAB_BLUR_PX }}
                          transition={{
                            ...tabSwapTransition,
                            layout: layoutTransition,
                          }}
                        >
                          <span className={clsx("relative shrink-0", tab.iconBox)}>
                            <img
                              alt=""
                              className="pointer-events-none absolute inset-0 block size-full max-w-none object-contain"
                              src={tab.icon}
                              width={20}
                              height={20}
                            />
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RebuildAside({ active }) {
  const reduceMotion = useReducedMotion();

  const activeTab = SECTION_TABS.find((t) => t.id === active) ?? SECTION_TABS[0];
  const ctaEase = reduceMotion ? { duration: 0 } : { duration: 0.42, ease: [0.2, 0.94, 0.32, 1] };
  return (
    <div
      className="flex w-full min-h-0 flex-col items-start gap-8 max-sm:gap-10 sm:gap-10 max-[1431px]:px-4 max-sm:max-[1431px]:px-6 sm:max-[1431px]:px-6 min-[1432px]:gap-10 min-[1432px]:px-0"
      data-node-id="320:396"
      data-name="Frame 43"
    >
      <div className="hidden w-full shrink-0 min-[1432px]:block">
        <RebuildAsideNav active={active} />
      </div>

      <div
        className="relative flex w-full max-[1431px]:shrink-0 min-w-0 shrink-0 flex-col items-start gap-8 max-sm:gap-10 sm:gap-10 text-left"
        data-node-id="320:399"
      >
        <HeroGlowFrames />

        <div
          className="relative z-10 flex w-full shrink-0 flex-col items-start gap-6 text-left"
          data-node-id="320:521"
        >
          <div
            className="flex h-7 shrink-0 items-center justify-start gap-2"
            data-node-id="320:409"
          >
            <div className="relative flex size-2 shrink-0 items-start justify-center" data-node-id="320:410">
              <div
                className="relative flex h-full min-w-px flex-1 flex-col items-start justify-center rounded-full bg-[#0ac000]"
                data-node-id="320:411"
              >
                <div
                  className="relative min-h-px w-full flex-1 rounded-full bg-[#0ac000] opacity-[0.48]"
                  data-node-id="320:412"
                  aria-hidden
                />
              </div>
            </div>
            <div className="relative flex flex-col items-start" data-node-id="320:413">
              <div
                className={clsx(
                  "flex shrink-0 flex-col justify-center whitespace-nowrap text-[16px] leading-[0] text-[var(--wx-muted)]",
                  rbRegular,
                )}
                style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
                data-node-id="320:414"
              >
                <p className="m-0 leading-[28px]">Available for work</p>
              </div>
            </div>
          </div>

          <div className="relative flex w-full min-w-0 flex-col gap-3">
            <div
              className={clsx(
                "relative flex shrink-0 flex-wrap items-center justify-start whitespace-normal text-[32px] not-italic leading-[0] sm:whitespace-nowrap",
                rbSemibold,
              )}
              style={{ fontFamily: "var(--font-display)", ...RB_FONT_VAR }}
              data-node-id="320:417"
            >
              <div className="relative flex shrink-0 flex-col justify-center text-[var(--wx-ink)]" data-node-id="320:397">
                <p className="m-0 leading-[40px]">Designs that feel&nbsp;</p>
              </div>
              <div
                className="relative flex shrink-0 flex-col justify-center bg-clip-text text-transparent"
                style={{ backgroundImage: CLEAR_GRADIENT }}
                data-node-id="320:418"
              >
                <p className="m-0 leading-[40px]">clear</p>
              </div>
            </div>

            <div
              className={clsx(
                "relative flex max-w-full shrink-0 flex-col items-start justify-center whitespace-normal text-left text-[16px] leading-[0] text-[var(--wx-muted)] sm:whitespace-nowrap",
                rbRegular,
              )}
              style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
              data-node-id="320:393"
            >
              <p className="m-0 leading-[24px]">Atlanta-based product designer shaping clear flows,</p>
              <p className="m-0 leading-[24px]">prototypes, and motion-rich UI.</p>
            </div>
          </div>
        </div>

        <div
          className="relative z-10 flex w-full shrink-0 flex-wrap items-start justify-start gap-4 max-sm:gap-5 sm:gap-5"
          data-node-id="320:388"
        >
          <motion.a
            href={emailHref()}
            className={clsx(
              "relative isolate flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-solid px-[15px] py-[9px] text-[14px] leading-[0] text-white",
              rbSemibold,
            )}
            style={{
              borderColor: activeTab.accentBorder,
              fontFamily: "var(--font-body)",
              ...RB_FONT_VAR,
            }}
            animate={{ borderColor: activeTab.accentBorder }}
            transition={ctaEase}
            data-node-id="320:389"
          >
            {SECTION_TABS.map((tab) => (
              <motion.span
                key={tab.id}
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-[1] rounded-[12px]"
                style={{ backgroundImage: tab.accentBg }}
                initial={false}
                animate={{ opacity: tab.id === activeTab.id ? 1 : 0 }}
                transition={ctaEase}
              />
            ))}
            <span className="relative z-10 leading-[20px]">Get in touch</span>
          </motion.a>
          <a
            href="#rebuild-work"
            className={clsx(
              "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[var(--wx-border-muted)] border-solid bg-[var(--wx-white)] px-[15px] py-[9px] text-[14px] leading-[0] text-[var(--wx-ink)]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            data-node-id="320:391"
          >
            <span className="leading-[20px]">View work</span>
          </a>
        </div>
      </div>

    </div>
  );
}
