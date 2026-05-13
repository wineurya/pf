import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";

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

  const mediaH = imageMode === "bottom" || imageMode === "right-bottom" ? "min-h-[200px] sm:h-[318px]" : "min-h-[200px] sm:h-[319px]";

  return (
    <div className="flex flex-col items-stretch overflow-hidden rounded-t-2xl bg-white">
      <div className={`relative w-full shrink-0 overflow-hidden ${mediaH}`}>
        <div className={`absolute ${imgPosition} max-w-none`}>
          <img src={REBUILD_ASSETS.processLandscape} alt="" className="size-full max-w-none object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[52px]">
          <img alt="" className="size-full object-cover" src={REBUILD_ASSETS.processImageBottom} />
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-6 pb-6 pt-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="flex items-center bg-[#171717] p-2"
            style={{ borderRadius: iconRadius }}
          >
            <img src={icon} alt="" className="size-4" width={16} height={16} />
          </div>
          <p className="m-0 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-6 tracking-[-0.5px] text-[#171717]">
            {title}
          </p>
        </div>
        <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-medium leading-5 tracking-[-0.5px] text-[#666]">
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
        <div className="inline-flex w-fit items-center justify-center rounded-[37px] bg-[#e5f3f2] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[14px] font-medium leading-5 text-[#289f95]">
          PROCESS
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
          <h2
            id="rebuild-process-h"
            className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-display)] text-[28px] font-semibold leading-9 text-[#171717] sm:text-[32px] sm:leading-9"
          >
            <span className="block font-[family-name:var(--font-display)] text-[#6b6b6b]">Making sure there are</span>
            <span className="block font-[family-name:var(--font-display)] text-[#171717]">no surprises.</span>
          </h2>
          <p className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-body)] text-[16px] font-medium leading-6 tracking-[-0.5px] text-[#666]">
            The work stays visible: what is planned, what is moving, what needs review, and what is ready for build.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:gap-[38px] lg:grid-cols-2">
        <ProcessCard {...CARDS[0]} />
        <ProcessCard {...CARDS[1]} />
        <ProcessCard {...CARDS[2]} />
        <ProcessCard {...CARDS[3]} />
      </div>
    </section>
  );
}
