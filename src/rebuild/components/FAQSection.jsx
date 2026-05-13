import { useId, useState } from "react";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";
import { REBUILD_FAQS } from "@/rebuild/data/faqs.js";

function FAQItem({ item, isOpen, onToggle }) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const btnId = `${baseId}-btn`;

  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <h3 className="m-0">
        <button
          type="button"
          id={btnId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-4 text-left font-[family-name:var(--font-display)] text-[15px] font-semibold leading-snug text-[#171717] outline-offset-2 sm:text-base"
        >
          <span>{item.q}</span>
          <span className="text-[#666] transition-transform duration-200" aria-hidden style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!isOpen}
        className={isOpen ? "block pb-4" : "hidden"}
      >
        <p className="m-0 font-[family-name:var(--font-body)] text-[14px] font-normal leading-6 tracking-[-0.2px] text-[#666] sm:text-[15px]">
          {item.a}
        </p>
      </div>
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
        <div className="inline-flex w-fit items-center justify-center rounded-[37px] bg-[#e5f3e9] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[14px] font-medium leading-5 text-[#289f4c]">
          FAQ
        </div>
        <h2 id="rebuild-faq-h" className="m-0 text-center font-[family-name:var(--font-display)] text-[28px] font-semibold leading-9 sm:text-[32px] sm:leading-9">
          <span className="text-[#6b6b6b]">Questions, </span>
          <span className="text-[#171717]">answered.</span>
        </h2>
      </div>
      <div className="relative flex min-h-[280px] w-full flex-col px-4 sm:min-h-[400px] sm:px-12 lg:min-h-[577px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={REBUILD_ASSETS.faqFrame} alt="" className="size-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "linear-gradient(0deg, rgba(255, 255, 255, 0) 86.468%, rgb(255, 255, 255) 100%)",
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 86.754%, rgb(255, 255, 255) 100%)",
              ].join(", "),
            }}
          />
        </div>
        <div className="relative z-10 flex flex-1 items-stretch justify-center bg-white sm:my-6 sm:mx-auto sm:max-w-2xl sm:rounded-xl sm:shadow-sm">
          <div className="w-full px-4 py-2 sm:px-8 sm:py-6">
            {REBUILD_FAQS.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
