import { RebuildSectionKicker } from "@/rebuild/components/RebuildSectionKicker.jsx";
import { REBUILD_SECTION_KICKER_ACCENTS } from "@/rebuild/data/sectionKickers.js";
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
          <RebuildSectionKicker label="STUDIO" accentHex={REBUILD_SECTION_KICKER_ACCENTS.studio} />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <h2
              id="rebuild-studio-h"
              className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-display)] text-[28px] max-sm:text-[30px] font-semibold leading-9 max-sm:leading-9 text-[var(--wx-ink)] sm:text-[32px] sm:leading-9"
            >
              <span className="block text-[var(--wx-muted)]">Useful imagination,</span>
              <span className="block text-[var(--wx-ink)]">grounded in product work.</span>
            </h2>
            <p className="m-0 pt-[2px] max-w-xl flex-[1] font-[family-name:var(--font-body)] text-[16px] font-medium leading-6 tracking-[-0.5px] text-[var(--wx-muted)]">
              A compact product-design studio inside one portfolio: research, flows, prototypes, motion, and
              build-ready notes.
            </p>
          </div>
        </div>
        <div className="relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-t-3xl pt-12 px-6 max-sm:px-8 max-sm:pt-14 sm:h-[577px] sm:pt-12 sm:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-t-3xl">
            <img
              src={REBUILD_ASSETS.studioHero}
              alt=""
              className="size-full max-w-none rounded-t-3xl object-cover object-center"
            />
            <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-b from-transparent from-[86.754%] to-[var(--wx-page-bg)]" />
          </div>
          <div className="relative z-10 flex min-h-[200px] flex-1 items-center justify-center overflow-hidden rounded-t-2xl rounded-b-none bg-[var(--wx-page-bg)] px-8 py-16 sm:px-[clamp(2rem,20vw,26rem)]">
            <span className="font-[family-name:var(--font-body)] text-[12px] font-normal leading-normal text-[var(--wx-ink)]">
              Needs visuals
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
