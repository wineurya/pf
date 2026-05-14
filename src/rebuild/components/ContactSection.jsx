import { useState } from "react";
import { ArrowUpRight, Check, Clipboard, Mail } from "lucide-react";
import { AsideSocialRail, CTA_SURFACE_GLOSS } from "@/rebuild/components/RebuildAside.jsx";
import { SITE_CONTACT_SOCIALS } from "@/exploration/siteContent.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { RebuildSectionKicker } from "@/rebuild/components/RebuildSectionKicker.jsx";
import { REBUILD_SECTION_KICKER_ACCENTS } from "@/rebuild/data/sectionKickers.js";
import { REBUILD_CONTACT } from "@/rebuild/data/contact.js";

function contactHref(label) {
  return SITE_CONTACT_SOCIALS.find((s) => s.label === label)?.href ?? "#";
}

function emailAddressFromHref(href) {
  return href.replace(/^mailto:/, "").split("?")[0] || href;
}

/**
 * Final contact closer. Cope-inspired in structure: big closing line, plain
 * next step, sparse footer links. Theme toggle lives at page level.
 */
export function ContactSection({ activeSectionId }) {
  const [copyState, setCopyState] = useState("idle");
  const reduceMotion = useReducedMotion();
  const emailHref = contactHref("Email");
  const emailAddress = emailAddressFromHref(emailHref);
  const linkedInHref = contactHref("LinkedIn");
  const isCopied = copyState === "copied";

  const handleCopyEmail = async () => {
    if (!navigator.clipboard?.writeText) {
      window.location.href = emailHref;
      return;
    }

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      window.location.href = emailHref;
    }
  };

  return (
    <section
      id="rebuild-contact"
      className="relative isolate scroll-mt-[7rem] border-0 outline-none"
      aria-labelledby="rebuild-contact-h"
    >
      <div className="relative z-[1] grid gap-10 bg-transparent px-0 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(260px,326px)] lg:items-end lg:gap-10 lg:py-20">
        <div className="min-w-0 max-w-[760px]">
          <RebuildSectionKicker
            label={REBUILD_CONTACT.eyebrow}
            accentHex={REBUILD_SECTION_KICKER_ACCENTS.contact}
          />
          <h2
            id="rebuild-contact-h"
            className="m-0 mt-5 w-full max-w-none text-balance font-[family-name:var(--font-display)] text-[32px] font-black leading-8 tracking-[0]"
          >
            <span className="block text-[rgba(171,171,171,1)]">{REBUILD_CONTACT.headlineLead}</span>
            <span className="block text-[var(--wx-ink)]">{REBUILD_CONTACT.headlineAccent}</span>
          </h2>
          <p className="m-0 mt-6 max-w-2xl text-pretty font-[family-name:var(--font-body)] text-[16px] font-medium leading-6 tracking-[-0.2px] text-[var(--wx-muted)]">
            {REBUILD_CONTACT.supporting}
          </p>
        </div>

        <div className="min-w-0 border-t border-[var(--wx-border-soft)] pt-6 lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="m-0 max-w-xs text-pretty font-[family-name:var(--font-body)] text-[14px] font-semibold leading-6 text-[var(--wx-muted)]">
            {REBUILD_CONTACT.availability}
          </p>
          <div className="mt-5 flex flex-col items-stretch gap-3">
            <a
              href={emailHref}
              aria-label={`Send email to ${emailAddress}`}
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-xl px-4 py-3 text-left font-[family-name:var(--font-body)] text-[14px] font-semibold text-white outline-offset-2 transition-[filter] duration-200 ease-out hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
              style={{
                backgroundImage: [
                  `${CTA_SURFACE_GLOSS}`,
                  "linear-gradient(90deg, #d97706 0%, #d97706 100%)",
                ].join(", "),
              }}
            >
              <span className="inline-flex min-w-0 flex-1 items-center gap-2">
                <Mail aria-hidden size={17} strokeWidth={2} className="shrink-0" />
                {reduceMotion ? (
                  <span className="flex min-w-0 flex-col gap-0.5 text-left">
                    <span className="leading-5">{REBUILD_CONTACT.actions.email}</span>
                    <span className="truncate text-[12px] font-semibold leading-4 opacity-95">{emailAddress}</span>
                  </span>
                ) : (
                  <span className="relative block h-5 min-w-0 overflow-hidden leading-5">
                    <span
                      className="flex flex-col will-change-transform transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:translate-y-0 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0 motion-reduce:will-change-auto"
                    >
                      <span className="block whitespace-nowrap leading-5">{REBUILD_CONTACT.actions.email}</span>
                      <span className="block min-w-0 truncate leading-5">{emailAddress}</span>
                    </span>
                  </span>
                )}
              </span>
              <ArrowUpRight aria-hidden size={17} strokeWidth={2} className="shrink-0" />
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl border border-[var(--wx-border-soft)] bg-[var(--wx-white)] px-4 py-3 text-left font-[family-name:var(--font-body)] text-[14px] font-semibold text-[var(--wx-ink)] outline-offset-2 transition-[transform,border-color,color] duration-200 ease-out motion-safe:hover:-translate-y-px hover:border-[color-mix(in_srgb,#d97706_42%,var(--wx-border-soft))] hover:text-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
            >
              <span className="inline-flex items-center gap-2">
                {isCopied ? (
                  <Check aria-hidden size={17} strokeWidth={2} />
                ) : (
                  <Clipboard aria-hidden size={17} strokeWidth={2} />
                )}
                {isCopied ? REBUILD_CONTACT.actions.copied : REBUILD_CONTACT.actions.copy}
              </span>
              <span className="sr-only" aria-live="polite">
                {isCopied ? "Email copied." : ""}
              </span>
            </button>
            <a
              href={linkedInHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-xl bg-transparent px-4 py-3 text-left font-[family-name:var(--font-body)] text-[14px] font-semibold text-[var(--wx-ink)] outline-offset-2 transition-[transform,color] duration-200 ease-out motion-safe:hover:-translate-y-px hover:text-[#d97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)]"
            >
              <span className="inline-flex items-center gap-2">
                {REBUILD_CONTACT.actions.linkedIn}
              </span>
              <ArrowUpRight aria-hidden size={17} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <footer className="relative z-[1] flex flex-col gap-4 border-t border-[var(--wx-border-soft)] py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-body)] text-[13px] font-semibold text-[var(--wx-muted)]">
          <span>{REBUILD_CONTACT.footerName}</span>
          <span aria-hidden>&copy;</span>
          <span>{new Date().getFullYear()}</span>
        </p>
        <div className="w-full sm:max-w-[420px]">
          <AsideSocialRail activeSectionId={activeSectionId ?? "rebuild-contact"} />
        </div>
      </footer>
    </section>
  );
}
