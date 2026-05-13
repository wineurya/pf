import "@/rebuild/rebuild.css";
import { RebuildAside, RebuildAsideNav } from "@/rebuild/components/RebuildAside.jsx";
import { WorkSection } from "@/rebuild/components/WorkSection.jsx";
import { StudioSection } from "@/rebuild/components/StudioSection.jsx";
import { ProcessSection } from "@/rebuild/components/ProcessSection.jsx";
import { FAQSection } from "@/rebuild/components/FAQSection.jsx";
import { ContactSection } from "@/rebuild/components/ContactSection.jsx";
import { RebuildPersistentThemeToggle } from "@/rebuild/components/RebuildPersistentThemeToggle.jsx";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";
import { useRebuildSectionActive } from "@/rebuild/useRebuildSectionActive.js";
import { useRebuildTheme } from "@/rebuild/useRebuildTheme.js";

export default function RebuildPage() {
  const active = useRebuildSectionActive();
  const theme = useRebuildTheme();

  return (
    <div className="rebuild-page relative min-h-dvh w-full bg-[var(--wx-page-bg)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--rebuild-page-bg-img-h)] select-none">
        <img
          src={REBUILD_ASSETS.pageBackground}
          alt=""
          className="absolute size-full max-w-none object-cover object-bottom"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 140% 88% at 50% 90%, transparent 0%, color-mix(in oklch, var(--wx-page-bg) 85%, transparent) 55%, var(--wx-page-bg) 100%)",
          }}
        />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1600px] min-[1432px]:max-w-none min-[1432px]:w-full flex-col gap-10 py-8 max-sm:gap-12 max-sm:py-10 sm:py-12 max-[1431px]:px-[var(--wx-pad-x)] max-[1431px]:py-0 max-[1431px]:pb-8 min-[1432px]:flex-row min-[1432px]:items-stretch min-[1432px]:justify-between min-[1432px]:gap-6 min-[1432px]:px-16 min-[1432px]:py-0 min-[1432px]:pb-12">
        {/* Mobile: no gap between fixed chrome / spacer / aside; spacer height via --rebuild-mobile-nav-spacer (rebuild.css). */}
        <div className="max-[1431px]:flex max-[1431px]:flex-col max-[1431px]:gap-0 min-[1432px]:contents">
          {/* Stacked: fixed bar (viewport-locked) + spacer so aside/main aren’t covered; desktop hidden */}
          <div className="w-full min-w-0 min-[1432px]:hidden max-[1431px]:fixed max-[1431px]:inset-x-0 max-[1431px]:top-0 max-[1431px]:z-40 max-[1431px]:px-[var(--wx-pad-x)] max-[1431px]:transform-gpu">
            <div className="max-[1431px]:bg-[var(--wx-page-bg)] max-[1431px]:backdrop-blur-sm max-[1431px]:[backface-visibility:hidden]">
              <div className="max-[1431px]:pb-4 rebuild-mobile-header-pt">
                <div className="mx-auto w-full min-w-0 max-w-[var(--rebuild-stack-max)] max-[1431px]:px-4 max-sm:max-[1431px]:px-6 sm:max-[1431px]:px-6">
                  <RebuildAsideNav active={active} />
                </div>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none h-24 w-full max-[1431px]:bg-[linear-gradient(to_bottom,var(--wx-page-bg)_0%,transparent_100%)]"
            />
          </div>
          <div
            aria-hidden
            className="max-[1431px]:block max-[1431px]:h-[var(--rebuild-mobile-nav-spacer)] max-[1431px]:shrink-0 min-[1432px]:hidden"
          />

          {/* Desktop: aside column stretches with main (`self-stretch`) so sticky stays pinned for the whole scroll track; sticky shell uses `self-start` + content height — not a full-column flex stretch */}
          <aside className="rebuild-page__aside mx-auto flex min-h-0 w-full min-w-0 max-w-[var(--rebuild-stack-max)] shrink-0 flex-col items-start min-[1432px]:mx-0 min-[1432px]:w-[419px] min-[1432px]:max-w-[419px] min-[1432px]:self-stretch">
            <div className="flex w-full min-h-0 flex-col min-[1432px]:sticky min-[1432px]:top-12 min-[1432px]:max-h-none min-[1432px]:self-start min-[1432px]:overflow-visible">
              <RebuildAside active={active} />
            </div>
          </aside>
        </div>

        <div className="rebuild-page__main mx-auto flex w-full min-w-0 max-w-[var(--rebuild-stack-max)] flex-1 flex-col gap-10 rounded-b-3xl bg-[var(--wx-page-bg)] max-sm:gap-12 sm:gap-12 max-[1431px]:px-4 max-sm:max-[1431px]:px-6 sm:max-[1431px]:px-6 max-[1431px]:pb-10 max-[1431px]:pt-4 min-[1432px]:mx-0 min-[1432px]:max-w-none min-[1432px]:px-12 min-[1432px]:pb-0 min-[1432px]:pt-0">
          <WorkSection />
          <StudioSection />
          <div className="flex flex-col gap-10 max-sm:gap-12 sm:gap-12">
            <ProcessSection />
            <FAQSection />
          </div>
          <ContactSection activeSectionId={active} />
        </div>
      </div>

      <RebuildPersistentThemeToggle mode={theme.mode} onToggle={theme.toggle} />
    </div>
  );
}
