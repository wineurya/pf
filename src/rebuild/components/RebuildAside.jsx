import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";
import { SITE_CONTACT_SOCIALS } from "@/exploration/siteContent.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { REBUILD_ASSETS, REBUILD_WORDMARK_DOT_GRADIENT } from "@/rebuild/data/assets.js";
import { RB_FONT_VAR, rbRegular, rbSemibold } from "@/rebuild/rebuildTypography.js";

/** Node 320:396 — Frame 43. Tab accents + “clear” gradient from Figma MCP. */
const CLEAR_GRADIENT =
  "linear-gradient(125.29339608789654deg, rgb(37, 99, 235) 0%, rgb(124, 58, 237) 48%, rgb(13, 148, 136) 78%, rgb(217, 119, 6) 100%)";

const SECTION_TABS = [
  {
    id: "rebuild-work",
    label: "Work",
    nodeId: "320:476",
    collapsedClass: "w-[42.66px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)",
    icon: REBUILD_ASSETS.navIconWork,
    iconBox: "h-[17px] w-[17px]",
    iconMr: "",
  },
  {
    id: "rebuild-studio",
    label: "Studio",
    nodeId: "320:485",
    collapsedClass: "w-[42.67px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(124, 58, 237) 0%, rgb(124, 58, 237) 100%)",
    icon: REBUILD_ASSETS.navIconStudio,
    iconBox: "h-[17.03px] w-[17.03px] mr-[-0.01px]",
    iconMr: "",
  },
  {
    id: "rebuild-process",
    label: "Process",
    nodeId: "320:495",
    collapsedClass: "w-[42.67px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(13, 148, 136) 0%, rgb(13, 148, 136) 100%)",
    icon: REBUILD_ASSETS.navIconProcess,
    iconBox: "h-[17px] w-[17px]",
    iconMr: "",
  },
  {
    id: "rebuild-contact",
    label: "Contact",
    nodeId: "320:504",
    collapsedClass: "w-[42.67px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(217, 119, 6) 0%, rgb(217, 119, 6) 100%)",
    icon: REBUILD_ASSETS.navIconContact,
    iconBox: "h-[18.02px] w-[18.02px]",
    iconMr: "mr-[-0.51px]",
  },
];

const SCROLL_SPY_IDS = ["rebuild-work", "rebuild-studio", "rebuild-process", "rebuild-faq", "rebuild-contact"];

const LAYOUT_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.85 };
const LABEL_SPRING = { type: "spring", stiffness: 480, damping: 32, mass: 0.65 };

function tabIdForScrollSection(sectionId) {
  if (sectionId === "rebuild-faq") return "rebuild-process";
  return sectionId;
}

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

/** Soft “white frame” glows without `filter: blur()` so paint doesn’t extend scroll size (motion perf). */
function HeroGlowFrames({ reduceMotion }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[296px] w-[432px] max-w-[min(432px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[32px]"
      data-node-id="344:1462"
      style={{
        background:
          "radial-gradient(ellipse 72% 58% at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.42) 48%, rgba(255,255,255,0) 72%)",
      }}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function SocialGlowFrame({ reduceMotion }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[97px] w-[267px] max-w-[min(267px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[32px]"
      data-node-id="344:1464"
      style={{
        background:
          "radial-gradient(ellipse 70% 65% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 72%)",
      }}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    />
  );
}

export function RebuildAside() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(SECTION_TABS[0].id);

  useEffect(() => {
    const nodes = SCROLL_SPY_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const sid = visible[0]?.target?.id;
        if (sid) setActive(tabIdForScrollSection(sid));
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const onTabKeyDown = useCallback((e, index) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + SECTION_TABS.length) % SECTION_TABS.length;
    scrollToSection(SECTION_TABS[next].id);
    e.currentTarget.parentElement?.querySelectorAll("button")[next]?.focus();
  }, []);

  const layoutTransition = reduceMotion ? { duration: 0 } : LAYOUT_SPRING;
  const labelTransition = reduceMotion ? { duration: 0.12 } : LABEL_SPRING;

  return (
    <div
      className="flex size-full min-h-0 flex-col items-start justify-between pr-[24px]"
      data-node-id="320:396"
      data-name="Frame 43"
    >
      <div
        className="flex w-full max-w-[395px] shrink-0 items-center justify-between sm:w-[395px]"
        data-node-id="320:520"
      >
        <div className="flex shrink-0 flex-col items-start justify-center" data-node-id="320:420">
          <div className="flex w-full items-center justify-between" data-node-id="320:421">
            <div
              className={clsx(
                "flex shrink-0 flex-col justify-center text-[16px] leading-[0] text-[#171717]",
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
                    "flex shrink-0 flex-col justify-center text-[16px] leading-[0] text-[#171717]",
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

        <div className="relative flex min-w-0 shrink-0 flex-col items-start" data-node-id="320:473">
          <div
            className="relative flex w-[251px] max-w-full shrink-0 flex-col items-start overflow-hidden rounded-[12px] border border-[rgba(0,0,0,0.05)] border-solid bg-[#f3f3f3] p-px backdrop-blur-[4px]"
            data-node-id="320:474"
          >
            <div className="relative w-full shrink-0 rounded-[8px]" data-node-id="320:475">
              <div
                className="relative flex size-full items-center justify-center gap-[3px] overflow-hidden border-0 border-transparent bg-clip-padding p-1"
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
                      aria-selected={selected}
                      aria-controls={tab.id}
                      tabIndex={selected ? 0 : -1}
                      data-node-id={tab.nodeId}
                      data-name={tab.label}
                      onClick={() => scrollToSection(tab.id)}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                      transition={{ layout: layoutTransition }}
                      className={clsx(
                        "relative flex h-[38px] shrink-0 items-center overflow-hidden rounded-[8px] px-1.5",
                        selected ? "justify-start gap-1.5 pl-2 pr-2.5" : "justify-center px-1.5",
                        !selected && tab.collapsedClass,
                      )}
                    >
                      <span className="absolute inset-0 rounded-[8px] bg-[#a3a3a3]" aria-hidden />
                      <motion.span
                        className="absolute inset-0 rounded-[8px]"
                        aria-hidden
                        initial={false}
                        animate={{ opacity: selected ? 1 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                        style={{ backgroundImage: tab.accentBg }}
                      />
                      <span className="relative z-10 flex min-w-0 items-center">
                        <motion.span
                          layout="position"
                          transition={{ layout: layoutTransition }}
                          className={clsx("relative flex shrink-0 flex-col items-center justify-center", tab.iconMr)}
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
                        <AnimatePresence initial={false} mode="popLayout">
                          {selected ? (
                            <motion.span
                              key="label"
                              layout
                              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86, x: 6 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, x: 4 }}
                              transition={labelTransition}
                              className={clsx(
                                "max-w-[160px] origin-left overflow-hidden whitespace-nowrap text-left text-[14px] leading-[22.75px] text-white",
                                rbRegular,
                              )}
                              style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
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
        </div>
      </div>

      <div className="relative flex min-h-0 shrink-0 flex-col items-start gap-4 overflow-x-clip" data-node-id="320:399">
        <HeroGlowFrames reduceMotion={reduceMotion} />

        <div className="relative z-10 flex shrink-0 flex-col items-start gap-4" data-node-id="320:521">
          <div className="flex h-7 shrink-0 items-center gap-2" data-node-id="320:409">
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
                  "flex shrink-0 flex-col justify-center whitespace-nowrap text-[16px] leading-[0] text-[#666]",
                  rbRegular,
                )}
                style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
                data-node-id="320:414"
              >
                <p className="m-0 leading-[28px]">Available for work</p>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "relative flex shrink-0 items-center justify-center whitespace-nowrap text-[28px] not-italic leading-[0]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-display)", ...RB_FONT_VAR }}
            data-node-id="320:417"
          >
            <div className="relative flex shrink-0 flex-col justify-center text-[#171717]" data-node-id="320:397">
              <p className="m-0 leading-[28px]">Designs that feel&nbsp;</p>
            </div>
            <div
              className="relative flex shrink-0 flex-col justify-center bg-clip-text text-transparent"
              style={{ backgroundImage: CLEAR_GRADIENT }}
              data-node-id="320:418"
            >
              <p className="m-0 leading-[28px]">clear</p>
            </div>
          </div>

          <div
            className={clsx(
              "relative flex max-w-full shrink-0 flex-col justify-center whitespace-normal text-[16px] leading-[0] text-[#666] sm:whitespace-nowrap",
              rbRegular,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            data-node-id="320:393"
          >
            <p className="m-0 leading-[24px]">Atlanta-based product designer shaping clear flows,</p>
            <p className="m-0 leading-[24px]">prototypes, and motion-rich UI.</p>
          </div>
        </div>

        <div className="relative z-10 flex h-[38px] shrink-0 items-start gap-4" data-node-id="320:388">
          <a
            href={emailHref()}
            className={clsx(
              "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[#1e3a8a] border-solid px-[15px] py-[9px] text-[14px] leading-[0] text-white",
              rbSemibold,
            )}
            style={{
              fontFamily: "var(--font-body)",
              ...RB_FONT_VAR,
              backgroundImage:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)",
            }}
            data-node-id="320:389"
          >
            <span className="leading-[20px]">Get in touch</span>
          </a>
          <a
            href="#rebuild-work"
            className={clsx(
              "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[rgba(0,0,0,0.12)] border-solid bg-white px-[15px] py-[9px] text-[14px] leading-[0] text-[#171717]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            data-node-id="320:391"
          >
            <span className="leading-[20px]">View work</span>
          </a>
        </div>
      </div>

      <div className="relative flex w-full shrink-0 items-center justify-between overflow-x-clip py-0" data-node-id="329:356">
        <SocialGlowFrame reduceMotion={reduceMotion} />
        {[
          { node: "329:357", label: "LinkedIn", textNode: "329:358" },
          { node: "329:359", label: "Resume", textNode: "329:360" },
          { node: "329:368", label: "Email", textNode: "329:369" },
        ].map(({ node, label, textNode }) => (
          <a
            key={label}
            href={socialHref(label)}
            className={clsx(
              "relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-lg px-2.5 py-1.5 text-[14px] leading-[0] text-[#575757]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            data-node-id={node}
            {...(label === "LinkedIn" ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <span className="leading-[20px]" data-node-id={textNode}>
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
