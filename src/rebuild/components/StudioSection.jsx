import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";

export function StudioSection() {
  return (
    <section
      id="rebuild-studio"
      className="scroll-mt-[7rem] border-0 outline-none"
      aria-labelledby="rebuild-studio-h"
    >
      <div className="flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center justify-center rounded-[37px] bg-[rgba(196,78,100,0.12)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[14px] font-medium leading-5 text-[#c44e64]">
            STUDIO
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <h2
              id="rebuild-studio-h"
              className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-display)] text-[28px] font-semibold leading-9 text-[#171717] sm:text-[32px] sm:leading-9"
            >
              <span className="block text-[#6b6b6b]">Useful imagination,</span>
              <span className="block text-[#171717]">grounded in product work.</span>
            </h2>
            <p className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-body)] text-[16px] font-medium leading-6 tracking-[-0.5px] text-[#666]">
              A compact product-design studio inside one portfolio: research, flows, prototypes, motion, and
              build-ready notes.
            </p>
          </div>
        </div>
        <div className="relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-t-3xl pt-12 px-6 sm:h-[577px] sm:pt-12 sm:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-t-3xl">
            <img
              src={REBUILD_ASSETS.studioHero}
              alt=""
              className="size-full max-w-none rounded-t-3xl object-cover"
            />
            <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-b from-[rgba(255,255,255,0)] from-[86.754%] to-white" />
          </div>
          <div className="relative z-10 flex min-h-[200px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white/95 px-8 py-16 sm:px-[clamp(2rem,20vw,26rem)]">
            <span className="font-[Inter,ui-sans-serif,system-ui,sans-serif] text-[12px] font-normal leading-normal text-[#171717]">
              Needs visuals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
