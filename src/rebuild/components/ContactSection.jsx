import { SITE_CONTACT_SOCIALS } from "@/exploration/siteContent.js";
import { REBUILD_CONTACT } from "@/rebuild/data/contact.js";

function contactHref(label) {
  return SITE_CONTACT_SOCIALS.find((s) => s.label === label)?.href ?? "#";
}

export function ContactSection() {
  return (
    <section
      id="rebuild-contact"
      className="scroll-mt-[7rem] border-0 outline-none"
      aria-labelledby="rebuild-contact-h"
    >
      <div className="flex flex-col gap-4 pb-12">
        <div className="inline-flex w-fit items-center justify-center rounded-[37px] bg-[rgba(217,119,6,0.12)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[14px] font-medium leading-5 text-[#d97706]">
          CONTACT
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <h2
            id="rebuild-contact-h"
            className="m-0 max-w-lg flex-[1] font-[family-name:var(--font-display)] text-[28px] font-semibold leading-9 text-[#6b6b6b] sm:text-[32px] sm:leading-9"
          >
            <span className="text-[#6b6b6b]">{REBUILD_CONTACT.headlineLead}</span>
            <span className="text-[#171717]">{REBUILD_CONTACT.headlineAccent}</span>
          </h2>
          <p className="m-0 max-w-xl flex-[1] font-[family-name:var(--font-body)] text-[16px] font-medium leading-6 tracking-[-0.5px] text-[#666]">
            {REBUILD_CONTACT.supporting}
          </p>
        </div>
      </div>
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-6 overflow-hidden bg-white px-6 py-12 sm:min-h-[320px] lg:min-h-[360px]">
        <p className="m-0 text-center font-[family-name:var(--font-body)] text-[14px] font-medium tracking-[-0.2px] text-[#575757]">
          {REBUILD_CONTACT.availability}
        </p>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href={contactHref("Email")}
            className="inline-flex items-center justify-center rounded-xl border border-[#1e3a8a] px-5 py-2.5 text-center font-[family-name:var(--font-body)] text-[14px] font-semibold text-white outline-offset-2"
            style={{
              backgroundImage: [
                "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%)",
                "linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)",
              ].join(", "),
            }}
          >
            {REBUILD_CONTACT.emailLabel}
          </a>
          <a
            href={contactHref("LinkedIn")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-black/[0.12] bg-white px-5 py-2.5 text-center font-[family-name:var(--font-body)] text-[14px] font-semibold text-[#171717] outline-offset-2"
          >
            {REBUILD_CONTACT.linkedInLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
