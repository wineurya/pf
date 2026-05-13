import "@/rebuild/rebuild.css";
import { Navbar } from "@/rebuild/components/Navbar.jsx";
import { Hero } from "@/rebuild/components/Hero.jsx";
import { WorkSection } from "@/rebuild/components/WorkSection.jsx";
import { StudioSection } from "@/rebuild/components/StudioSection.jsx";
import { ProcessSection } from "@/rebuild/components/ProcessSection.jsx";
import { FAQSection } from "@/rebuild/components/FAQSection.jsx";
import { ContactSection } from "@/rebuild/components/ContactSection.jsx";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";

export default function RebuildPage() {
  return (
    <div className="rebuild-page relative min-h-dvh w-full bg-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(1004px,90vh)] select-none">
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
              "radial-gradient(ellipse 140% 88% at 50% 90%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 55%, rgb(255,255,255) 100%)",
          }}
        />
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1600px] flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:pl-16 lg:pr-6 lg:pt-12 lg:pb-12">
        <aside className="rebuild-page__aside flex w-full shrink-0 flex-col gap-10 lg:sticky lg:top-12 lg:h-[min(820px,calc(100dvh-3rem))] lg:min-h-0 lg:w-[419px] lg:justify-between lg:overflow-y-auto lg:self-start lg:pr-6">
          <Navbar />
          <Hero />
        </aside>

        <div className="rebuild-page__main flex w-full min-w-0 flex-1 flex-col gap-10 overflow-x-clip rounded-b-3xl bg-white sm:gap-12 lg:px-12">
          <WorkSection />
          <StudioSection />
          <div className="flex flex-col gap-10 sm:gap-12">
            <ProcessSection />
            <FAQSection />
          </div>
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
