import { REBUILD_SECTION_KICKER_ACCENTS } from "@/rebuild/data/sectionKickers.js";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";
import { RebuildSectionKicker } from "@/rebuild/components/RebuildSectionKicker.jsx";

const CARDS = [
  {
    key: "research",
    imageMode: "top",
    title: "Research before wireframes",
    body:
      "The work stays visible: what is planned, what is moving, what needs review, and what is ready for build.",
    icon: REBUILD_ASSETS.iconSearch,
    iconRadius: "32px",
  },
  {
    key: "structure",
    imageMode: "right-top",
    title: "Structure decisions",
    body: "Turn the messy middle into flows, states, and decisions the team can critique before visual polish.",
    icon: REBUILD_ASSETS.iconWorkflow,
    iconRadius: "48px",
  },
  {
    key: "prototype",
    imageMode: "bottom",
    title: "Prototype interactions early",
    body:
      "Make the risky moments clickable in a shared stack—motion, feedback, and comprehension get tested where they ship.",
    icon: REBUILD_ASSETS.iconCursorMagic,
    iconRadius: "48px",
  },
  {
    key: "test",
    imageMode: "right-bottom",
    title: "Test, refine, then hand off",
    body:
      "Usability testing, iteration, and accessibility validation through to handoff or build—plus states, specs, and front-end notes so details carry into production.",
    icon: REBUILD_ASSETS.iconTaskDone,
    iconRadius: "58px",
  },
];

function ProcessCard({ imageMode, title, body, icon, iconRadius }) {
  const imgPosition =
    imageMode === "top"
      ? "left-0 top-0 h-[676px] w-[1330px]"
      : imageMode === "bottom"
        ? "bottom-0 left-0 h-[676px] w-[1330px]"
        : imageMode === "right-top"
          ? "right-0 top-0 h-[676px] w-[1330px]"
          : "bottom-0 right-0 h-[676px] w-[1330px]";

  const mediaH = imageMode === "bottom" || imageMode === "right-bottom" ? "min-h-[200px] max-sm:min-h-[260px] sm:h-[318px]" : "min-h-[200px] max-sm:min-h-[260px] sm:h-[319px]";

  return (
    <div className="flex flex-col items-stretch overflow-hidden rounded-t-2xl bg-[var(--wx-page-bg)]">
      <div className={`relative w-full shrink-0 overflow-hidden ${mediaH}`}>
        <div className={`absolute ${imgPosition} max-w-none`}>
          <img src={REBUILD_ASSETS.processLandscape} alt="" className="size-full max-w-none object-cover" />
        </div>
        {/* Fade into page surface so the strip isn’t a hard cut in any theme. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--wx-page-bg) 0%, transparent) 0%, color-mix(in srgb, var(--wx-page-bg) 35%, transparent) 38%, color-mix(in srgb, var(--wx-page-bg) 78%, transparent) 70%, var(--wx-page-bg) 100%)",
          }}
        />
      </div>
      <div className="flex flex-col gap-2.5 bg-[var(--wx-page-bg)] px-6 pb-6 pt-[4px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="rebuild-process-card-icon-well"
            style={{ borderRadius: iconRadius }}
          >
            <img src={icon} alt="" width={16} height={16} />
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-6 tracking-[-0.5px] text-[var(--wx-ink)]">
            {title}
          </p>
        </div>
        <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-medium leading-5 tracking-[-0.5px] text-[var(--wx-muted)]">
          {body}
        </p>
      </div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section
      id="rebuild-process"
      className="scroll-mt-[7rem] border-0 outline-none"
      aria-labelledby="rebuild-process-h"
    >
      <div className="flex flex-col gap-4 pb-6">
        <RebuildSectionKicker label="PROCESS" accentHex={REBUILD_SECTION_KICKER_ACCENTS.process} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2
            id="rebuild-process-h"
            className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-display)] text-[28px] max-sm:text-[30px] font-semibold leading-9 max-sm:leading-9 sm:text-[32px] sm:leading-9"
          >
            <span className="block text-[rgba(171,171,171,1)]">Making sure there are</span>
            <span className="block text-[var(--wx-ink)]">no surprises.</span>
          </h2>
          <p className="m-0 pt-[2px] max-w-xl flex-[1] font-[family-name:var(--font-body)] text-[16px] font-medium leading-6 tracking-[-0.5px] text-[var(--wx-muted)]">
            The work stays visible: what is planned, what is moving, what needs review, and what is ready for build.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-[38px]">
        {CARDS.map(({ key, ...card }) => (
          <ProcessCard key={key} {...card} />
        ))}
      </div>
    </section>
  );
}
