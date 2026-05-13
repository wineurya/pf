import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { REBUILD_ASSETS, REBUILD_WORDMARK_DOT_GRADIENT } from "@/rebuild/data/assets.js";

const SECTIONS = [
  { id: "rebuild-work", label: "Work", icon: REBUILD_ASSETS.navIconWork, accent: "rgb(37, 99, 235)" },
  { id: "rebuild-studio", label: "Studio", icon: REBUILD_ASSETS.navIconStudio, accent: "rgb(124, 58, 237)" },
  { id: "rebuild-process", label: "Process", icon: REBUILD_ASSETS.navIconProcess, accent: "rgb(13, 148, 136)" },
  {
    id: "rebuild-contact",
    label: "Contact",
    icon: REBUILD_ASSETS.navIconContact,
    accent: "rgb(217, 119, 6)",
    showLabel: true,
    alwaysAccent: true,
  },
];

/** FAQ has no tab in Figma; treat as Process for active tab highlight while reading. */
const SCROLL_SPY_IDS = ["rebuild-work", "rebuild-studio", "rebuild-process", "rebuild-faq", "rebuild-contact"];

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

function WordmarkDot() {
  return (
    <span className="relative inline-flex size-3 shrink-0 pt-px">
      <span
        className="absolute left-0 top-0 size-3 rounded-[2px]"
        style={{
          backgroundImage: REBUILD_WORDMARK_DOT_GRADIENT,
          maskImage: `url('${REBUILD_ASSETS.wordmarkDotMask}')`,
          WebkitMaskImage: `url('${REBUILD_ASSETS.wordmarkDotMask}')`,
          maskSize: "12px 12px",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
        aria-hidden
      />
    </span>
  );
}

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(SECTIONS[0].id);

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
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + SECTIONS.length) % SECTIONS.length;
    scrollToSection(SECTIONS[next].id);
    e.currentTarget.parentElement?.querySelectorAll("button")[next]?.focus();
  }, []);

  return (
    <div
      className={clsx(
        "flex w-full max-w-[419px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
        "lg:w-full",
      )}
    >
      <div className="font-[family-name:var(--font-body)] text-[16px] font-semibold leading-[17.92px] text-[#171717]">
        <div className="flex w-full items-center justify-between gap-2">
          <span>wineury</span>
          <WordmarkDot />
        </div>
        <div className="mt-0 flex flex-col">
          <div className="flex items-center gap-1">
            <WordmarkDot />
            <span>almonte</span>
          </div>
        </div>
      </div>

      <nav
        aria-label="Page sections"
        className="backdrop-blur-[4px] min-w-0 rounded-[12px] border border-black/[0.05] bg-[#f3f3f3] p-px sm:max-w-none"
      >
        <div className="rounded-lg">
          <div
            className="flex items-center justify-center gap-[3px] overflow-x-auto p-1 sm:justify-center"
            role="tablist"
            aria-orientation="horizontal"
          >
            {SECTIONS.map((tab, i) => {
              const selected = active === tab.id;
              const showAccentOverlay = tab.alwaysAccent || selected;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={tab.id}
                  tabIndex={selected ? 0 : -1}
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  onClick={() => scrollToSection(tab.id)}
                  className={clsx(
                    "relative flex h-[38px] shrink-0 items-center justify-center overflow-hidden rounded-lg px-1.5",
                    tab.showLabel ? "min-w-[104px]" : "min-w-[42.67px] w-[42.67px]",
                  )}
                >
                  <span
                    className="absolute inset-0 z-0 rounded-lg bg-[#a3a3a3]"
                    aria-hidden
                  />
                  <span
                    className={clsx(
                      "absolute inset-0 z-10 rounded-lg",
                      showAccentOverlay ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                      backgroundImage: [
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%)",
                        `linear-gradient(90deg, ${tab.accent} 0%, ${tab.accent} 100%)`,
                      ].join(", "),
                    }}
                    aria-hidden
                  />
                  <span className="relative z-20 flex items-center justify-center">
                    <img src={tab.icon} alt="" className="size-[17px] max-w-none" width={17} height={17} />
                    {tab.showLabel ? (
                      <span className="pl-1.5 font-[family-name:var(--font-body)] text-[14px] font-normal leading-[22.75px] text-white">
                        {tab.label}
                      </span>
                    ) : null}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
