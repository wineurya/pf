import { motion } from "motion/react";
import { clsx } from "clsx";
import { SITE_CONTACT_SOCIALS } from "@/exploration/siteContent.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import { REBUILD_GRADIENT_WORD } from "@/rebuild/data/assets.js";

function emailHref() {
  return SITE_CONTACT_SOCIALS.find((s) => s.label === "Email")?.href ?? "#";
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-4">
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[296px] w-[432px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-[rgba(255,255,255,0.84)] blur-[40px]"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ) : null}

        <div
          className={clsx("relative flex flex-col gap-4", !reduceMotion && "z-10")}
        >
          <div className="flex h-7 items-center gap-2 font-[family-name:var(--font-body)] text-[16px] font-normal leading-7 text-[#666]">
            <span className="flex size-2 items-center justify-center">
              <span className="relative flex h-full w-full flex-col justify-center rounded-full bg-[#0ac000]">
                <span className="min-h-px w-full flex-1 rounded-full bg-[#0ac000] opacity-40" aria-hidden />
              </span>
            </span>
            <p className="m-0">Available for work</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-0 font-[family-name:var(--font-display)] text-[28px] font-semibold not-italic leading-7">
            <span className="text-[#171717]">Designs that feel&nbsp;</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: REBUILD_GRADIENT_WORD }}
            >
              clear
            </span>
          </div>

          <div className="max-w-[22rem] font-[family-name:var(--font-body)] text-[16px] font-normal leading-6 text-[#666] sm:max-w-none">
            <p className="m-0 whitespace-normal sm:whitespace-nowrap">
              Atlanta-based product designer shaping clear flows,
            </p>
            <p className="m-0 whitespace-normal sm:whitespace-nowrap">
              prototypes, and motion-rich UI.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <a
          href={emailHref()}
          className="inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#1e3a8a] px-[15px] py-[9px] font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-white"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%)",
              "linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(37, 99, 235) 100%)",
            ].join(", "),
          }}
        >
          Get in touch
        </a>
        <a
          href="#rebuild-work"
          className="inline-flex items-center justify-center overflow-hidden rounded-xl border border-black/[0.12] bg-white px-[15px] py-[9px] font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[#171717]"
        >
          View work
        </a>
      </div>

      <div className="relative mt-auto flex w-full flex-wrap items-center justify-between gap-2 pt-6 sm:pt-0">
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[97px] w-[267px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-white blur-[40px] sm:block"
          />
        ) : null}
        {SITE_CONTACT_SOCIALS.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            className="relative z-10 rounded-lg px-2.5 py-1.5 font-[family-name:var(--font-body)] text-[14px] font-semibold leading-5 text-[#575757] outline-offset-2"
            whileHover={reduceMotion ? undefined : { y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            {s.label === "Résumé" ? "Resume" : s.label}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
