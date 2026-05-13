import { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { SITE_CONTACT_SOCIALS } from "@/exploration/siteContent.js";
import { REBUILD_ASSETS, REBUILD_WORDMARK_DOT_GRADIENT } from "@/rebuild/data/assets.js";

/** Node 320:396 — "Frame 43" — source: Figma MCP `get_design_context` (exact structure). */
const CLEAR_GRADIENT =
  "linear-gradient(125.29339608789654deg, rgb(37, 99, 235) 0%, rgb(124, 58, 237) 48%, rgb(13, 148, 136) 78%, rgb(217, 119, 6) 100%)";

const SECTION_TABS = [
  {
    id: "rebuild-work",
    label: "Work",
    nodeId: "320:476",
    widthClass: "w-[42.66px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)",
    icon: REBUILD_ASSETS.navIconWork,
    iconBox: "h-[17px] w-[17px]",
    showLabel: false,
    iconMr: "",
  },
  {
    id: "rebuild-studio",
    label: "Studio",
    nodeId: "320:485",
    widthClass: "w-[42.67px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(124, 58, 237) 0%, rgb(124, 58, 237) 100%)",
    icon: REBUILD_ASSETS.navIconStudio,
    iconBox: "h-[17.03px] w-[17.03px] mr-[-0.01px]",
    showLabel: false,
    iconMr: "",
  },
  {
    id: "rebuild-process",
    label: "Process",
    nodeId: "320:495",
    widthClass: "w-[42.67px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(13, 148, 136) 0%, rgb(13, 148, 136) 100%)",
    icon: REBUILD_ASSETS.navIconProcess,
    iconBox: "h-[17px] w-[17px]",
    showLabel: false,
    iconMr: "",
  },
  {
    id: "rebuild-contact",
    label: "Contact",
    nodeId: "320:504",
    widthClass: "w-[104px]",
    accentBg:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(217, 119, 6) 0%, rgb(217, 119, 6) 100%)",
    icon: REBUILD_ASSETS.navIconContact,
    iconBox: "h-[18.02px] w-[18.02px]",
    showLabel: true,
    accentAlwaysVisible: true,
    iconMr: "mr-[-0.51px]",
  },
];

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

export function RebuildAside() {
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
              className="flex shrink-0 flex-col justify-center text-[16px] font-semibold leading-[0] text-[#171717]"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
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
                  className="flex shrink-0 flex-col justify-center text-[16px] font-semibold leading-[0] text-[#171717]"
                  style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
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
            className="relative flex w-[251px] max-w-full shrink-0 flex-col items-start overflow-clip rounded-[12px] border border-[rgba(0,0,0,0.05)] border-solid bg-[#f3f3f3] p-px backdrop-blur-[4px]"
            data-node-id="320:474"
          >
            <div className="relative w-full shrink-0 rounded-[8px]" data-node-id="320:475">
              <div
                className="relative flex size-full items-center justify-center gap-[3px] overflow-x-auto overflow-y-clip border-0 border-transparent bg-clip-padding p-1"
                role="tablist"
                aria-label="Page sections"
                aria-orientation="horizontal"
              >
                {SECTION_TABS.map((tab, i) => {
                  const selected = active === tab.id;
                  const showAccent = tab.accentAlwaysVisible || selected;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={tab.id}
                      tabIndex={selected ? 0 : -1}
                      data-node-id={tab.nodeId}
                      data-name={tab.label}
                      onClick={() => scrollToSection(tab.id)}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                      className={clsx(
                        "relative flex h-[38px] shrink-0 items-center justify-center overflow-clip rounded-[8px] px-1.5 min-w-[38px]",
                        tab.widthClass,
                      )}
                    >
                      <span className="absolute inset-0 rounded-[8px] bg-[#a3a3a3]" aria-hidden />
                      <span
                        className={clsx("absolute inset-0 rounded-[8px]", showAccent ? "opacity-100" : "opacity-0")}
                        style={{ backgroundImage: tab.accentBg }}
                        aria-hidden
                      />
                      <span className="relative z-10 flex items-center justify-center">
                        {tab.showLabel ? (
                          <>
                            <span
                              className={clsx(
                                "relative flex h-[22.75px] shrink-0 flex-col items-center justify-center pb-[2.37px] pt-[2.36px]",
                                tab.iconMr,
                              )}
                              data-node-id="320:508"
                            >
                              <span className={clsx("relative shrink-0", tab.iconBox)} data-node-id="320:509">
                                <img alt="" className="pointer-events-none absolute inset-0 block size-full max-w-none" src={tab.icon} />
                              </span>
                            </span>
                            <span className="flex max-w-[166px] shrink-0 flex-col items-start pl-1.5" data-node-id="320:512">
                              <span className="relative h-[22.75px] w-[49.3px] max-w-[160px] shrink-0 overflow-clip" data-node-id="320:513">
                                <span
                                  className="absolute left-[calc(50%-0.15px)] top-[10.5px] flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center whitespace-nowrap text-center text-[14px] font-normal leading-[22.75px] text-white"
                                  style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
                                  data-node-id="320:514"
                                >
                                  Contact
                                </span>
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={clsx("relative shrink-0", tab.iconBox)} data-node-id="320:480">
                              <img alt="" className="pointer-events-none absolute inset-0 block size-full max-w-none" src={tab.icon} />
                            </span>
                            <span className="h-[22.75px] w-[1.39px] shrink-0" aria-hidden data-node-id="320:484" />
                          </>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex shrink-0 flex-col items-start gap-4" data-node-id="320:399">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[calc(50%-1.25px)] top-1/2 h-[296px] w-[432px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-[rgba(255,255,255,0.84)] blur-[40px]"
          data-node-id="344:1462"
        />

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
                className="flex shrink-0 flex-col justify-center whitespace-nowrap text-[16px] font-normal leading-[0] text-[#666]"
                style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
                data-node-id="320:414"
              >
                <p className="m-0 leading-[28px]">Available for work</p>
              </div>
            </div>
          </div>

          <div
            className="relative flex shrink-0 items-center justify-center whitespace-nowrap text-[28px] not-italic leading-[0]"
            style={{ fontFamily: "var(--font-display)" }}
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
            className="relative flex shrink-0 flex-col justify-center whitespace-nowrap text-[16px] font-normal leading-[0] text-[#666]"
            style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
            data-node-id="320:393"
          >
            <p className="m-0 leading-[24px]">Atlanta-based product designer shaping clear flows,</p>
            <p className="m-0 leading-[24px]">prototypes, and motion-rich UI.</p>
          </div>
        </div>

        <div className="relative z-10 flex h-[38px] shrink-0 items-start gap-4" data-node-id="320:388">
          <a
            href={emailHref()}
            className="relative flex shrink-0 items-center justify-center overflow-clip rounded-[12px] border border-[#1e3a8a] border-solid px-[15px] py-[9px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)",
            }}
            data-node-id="320:389"
          >
            <div
              className="flex shrink-0 flex-col justify-center whitespace-nowrap text-center text-[14px] font-semibold leading-[0] text-white"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
              data-node-id="320:390"
            >
              <p className="m-0 leading-[20px]">Get in touch</p>
            </div>
          </a>
          <a
            href="#rebuild-work"
            className="relative flex shrink-0 items-center justify-center overflow-clip rounded-[12px] border border-[rgba(0,0,0,0.12)] border-solid bg-white px-[15px] py-[9px]"
            data-node-id="320:391"
          >
            <div
              className="flex shrink-0 flex-col justify-center whitespace-nowrap text-center text-[14px] font-semibold leading-[0] text-[#171717]"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
              data-node-id="320:392"
            >
              <p className="m-0 leading-[20px]">View work</p>
            </div>
          </a>
        </div>
      </div>

      <div className="relative flex w-full shrink-0 items-center justify-between" data-node-id="329:356">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[calc(50%-3.75px)] top-[calc(50%-0.5px)] h-[97px] w-[267px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-white blur-[40px]"
          data-node-id="344:1464"
        />
        {[
          { node: "329:357", label: "LinkedIn", textNode: "329:358" },
          { node: "329:359", label: "Resume", textNode: "329:360" },
          { node: "329:368", label: "Email", textNode: "329:369" },
        ].map(({ node, label, textNode }) => (
          <a
            key={label}
            href={socialHref(label)}
            className="relative z-10 flex shrink-0 items-center justify-center overflow-clip rounded-lg px-2.5 py-1.5"
            data-node-id={node}
            {...(label === "LinkedIn" ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            <div
              className="flex shrink-0 flex-col justify-center whitespace-nowrap text-[14px] font-semibold leading-[0] text-[#575757]"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'wdth' 100" }}
              data-node-id={textNode}
            >
              <p className="m-0 leading-[20px]">{label}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
