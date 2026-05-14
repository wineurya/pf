import { useId, useState } from "react";
import { motion } from "motion/react";
import { RebuildSectionKicker } from "@/rebuild/components/RebuildSectionKicker.jsx";
import { REBUILD_SECTION_KICKER_ACCENTS } from "@/rebuild/data/sectionKickers.js";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";
import { REBUILD_FAQS } from "@/rebuild/data/faqs.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

/** Panel + icon easing — softer than defaults, avoids spring snaps on height: auto */
const FAQ_EASE = [0.2, 0.94, 0.32, 1];

function FAQItem({ item, isOpen, onToggle }) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const btnId = `${baseId}-btn`;
  const reduceMotion = useReducedMotion();

  const panelTransition = reduceMotion ? { duration: 0 } : { duration: 0.29, ease: FAQ_EASE };
  const iconTransition = reduceMotion ? { duration: 0 } : { duration: 0.24, ease: FAQ_EASE };

  return (
    <div className="border-b border-[var(--wx-border-soft)] last:border-b-0">
      <h3 className="m-0">
        <button
          type="button"
          id={btnId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
          className="flex w-full items-center justify-between gap-5 rounded-xl py-5 text-left font-[family-name:var(--font-display)] text-[15px] font-semibold leading-snug text-[var(--wx-ink)] outline-offset-2 transition-colors duration-200 ease-out max-sm:text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wx-outline-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--wx-page-bg)] sm:gap-6 sm:text-base"
        >
          <span className="min-w-0">{item.q}</span>
          <motion.span
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--wx-border-muted)] bg-[color-mix(in_srgb,var(--wx-ink)_2.25%,var(--wx-page-bg))] text-[1.125rem] font-medium leading-none text-[var(--wx-muted)]"
            aria-hidden
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={iconTransition}
          >
            +
          </motion.span>
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        aria-hidden={!isOpen}
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={panelTransition}
        style={{ overflow: "hidden" }}
        className="min-h-0"
      >
        <p className="m-0 pb-6 pt-2 font-[family-name:var(--font-body)] text-[14px] font-normal leading-7 tracking-[-0.2px] text-[var(--wx-muted)] max-sm:text-[15px] sm:pb-6 sm:text-[15px] sm:leading-7">
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState(REBUILD_FAQS[0]?.id ?? null);

  return (
    <section
      id="rebuild-faq"
      className="scroll-mt-[7rem] border-0 outline-none"
      aria-labelledby="rebuild-faq-h"
    >
      <div className="flex flex-col items-center gap-4 pb-6">
        <RebuildSectionKicker label="FAQ" accentHex={REBUILD_SECTION_KICKER_ACCENTS.faq} />
        <h2
          id="rebuild-faq-h"
          className="m-0 text-center font-[family-name:var(--font-display)] text-[28px] font-semibold leading-9 max-sm:text-[30px] max-sm:leading-9 sm:text-[32px] sm:leading-9"
        >
          <span className="text-[var(--wx-muted)]">Questions, </span>
          <span className="text-[var(--wx-ink)]">answered.</span>
        </h2>
      </div>

      <div className="relative flex min-h-[380px] w-full flex-col px-4 max-sm:px-8 sm:min-h-[400px] sm:px-12">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={REBUILD_ASSETS.faqFrame} alt="" className="size-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "linear-gradient(0deg, transparent 86.468%, var(--wx-page-bg) 100%)",
                "linear-gradient(180deg, transparent 86.754%, var(--wx-page-bg) 100%)",
              ].join(", "),
            }}
          />
        </div>

        <div className="relative z-10 flex w-full flex-col bg-[var(--wx-page-bg)] sm:mx-auto sm:max-w-2xl lg:m-0 lg:max-w-none">
          <div className="flex min-h-0 flex-col px-4 max-sm:px-6 sm:px-8">
            {REBUILD_FAQS.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={(id) => setOpenId((prev) => (prev === id ? prev : id))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
