import { AsideSocialRail } from "@/rebuild/components/RebuildAside.jsx";
import { ContactForm } from "@/rebuild/components/ContactForm.jsx";
import { RebuildSectionKicker } from "@/rebuild/components/RebuildSectionKicker.jsx";
import { REBUILD_SECTION_KICKER_ACCENTS } from "@/rebuild/data/sectionKickers.js";
import { REBUILD_CONTACT } from "@/rebuild/data/contact.js";

/**
 * Final contact closer. Big closing line on the left, a send-a-message form on
 * the right that relays to contact@wineury.design via Web3Forms.
 */
export function ContactSection({ activeSectionId }) {
  return (
    <section
      id="rebuild-contact"
      className="relative isolate scroll-mt-[7rem] border-0 outline-none"
      aria-labelledby="rebuild-contact-h"
    >
      <div className="relative z-[1] grid gap-10 bg-transparent px-0 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-start lg:gap-12 lg:py-20">
        <div className="min-w-0 max-w-[760px]">
          <RebuildSectionKicker
            label={REBUILD_CONTACT.eyebrow}
            accentHex={REBUILD_SECTION_KICKER_ACCENTS.contact}
          />
          <h2
            id="rebuild-contact-h"
            className="m-0 mt-5 w-full max-w-none text-balance font-[family-name:var(--font-display)] text-[32px] font-emphasis leading-[36px] tracking-[0]"
          >
            <span className="block text-[rgba(171,171,171,1)]">{REBUILD_CONTACT.headlineLead}</span>
            <span className="block text-[var(--wx-ink)]">{REBUILD_CONTACT.headlineAccent}</span>
          </h2>
          <p className="m-0 mt-6 max-w-2xl text-pretty font-[family-name:var(--font-body)] text-[16px] font-normal leading-[1.625] tracking-[-0.2px] text-[var(--wx-muted)]">
            {REBUILD_CONTACT.supporting}
          </p>
        </div>

        <div className="min-w-0 border-t border-[var(--wx-border-soft)] pt-6 lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="m-0 max-w-xs text-pretty font-[family-name:var(--font-body)] text-[14px] font-semibold leading-6 text-[var(--wx-muted)]">
            {REBUILD_CONTACT.availability}
          </p>
          <ContactForm />
        </div>
      </div>

      <footer className="relative z-[1] flex flex-col gap-4 border-t border-[var(--wx-border-soft)] py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 font-[family-name:var(--font-body)] text-[13px] font-semibold text-[var(--wx-muted)]">
          &copy; {new Date().getFullYear()} {REBUILD_CONTACT.footerName}
        </p>
        <div className="w-full sm:max-w-[420px]">
          <AsideSocialRail activeSectionId={activeSectionId ?? "rebuild-contact"} />
        </div>
      </footer>
    </section>
  );
}
