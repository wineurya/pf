import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MaskedFigmaIcon, WX_WORDMARK_MARK_GRADIENT } from "@/exploration/MaskedFigmaIcon.jsx";
import { SITE_FIGMA_ASSETS } from "@/exploration/siteContent.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

const WX_EASE = [0.22, 1, 0.36, 1];

const LOGO_LAB_ROWS = [
  { label: "Small", use: "Navigation lockup, favicon-adjacent UI", className: "size-3", px: "12px" },
  { label: "Medium", use: "App shell, dense marketing headers", className: "size-6", px: "24px" },
  { label: "Large", use: "Hero, slide covers, brand moments", className: "size-12", px: "48px" },
];

function logoMotionVariants(reduceMotion) {
  const off = reduceMotion ? 0 : 16;
  const rowOff = reduceMotion ? 0 : 20;
  return {
    block: {
      hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : off },
      show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: WX_EASE } },
    },
    row: {
      hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : rowOff },
      show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.48, ease: WX_EASE } },
    },
    list: reduceMotion
      ? { hidden: {}, show: {} }
      : { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } },
  };
}

/**
 * Reference page: wineury mark at three common optical sizes (nav / product / marketing).
 * Hero headline animation uses the **small** row for parity with `WordmarkLink`.
 */
export default function LogoExplorationPage() {
  const reduceMotion = useReducedMotion();
  const v = logoMotionVariants(reduceMotion);

  return (
    <div className="site-canvas min-h-dvh bg-[var(--wx-page-bg)] px-[var(--wx-pad-x)] py-10 pb-16 text-[var(--wx-ink)]">
      <motion.p
        className="wx-text-meta mb-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={v.block}
      >
        <Link to="/design/kinetix" className="text-[var(--wx-primary)] underline-offset-2 hover:underline">
          Design lab
        </Link>
        <span className="text-[var(--wx-muted)]"> · </span>
        <span className="text-[var(--wx-muted)]">Logo exploration</span>
      </motion.p>

      <motion.header
        className="mb-10 max-w-2xl space-y-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={v.block}
      >
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Logo exploration</h1>
        <p className="wx-text-body-secondary text-[var(--wx-muted)]">
          Same mask + gradient as the wordmark in the top-left. Sizes follow typical roles: chrome, product, and
          marketing.
        </p>
      </motion.header>

      <motion.ul
        className="mx-auto flex max-w-lg flex-col gap-10 sm:gap-12"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={v.list}
      >
        {LOGO_LAB_ROWS.map((row) => (
          <motion.li
            key={row.label}
            variants={v.row}
            className="flex flex-col gap-4 border-b border-[color:var(--wx-border-soft)] pb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pb-12"
          >
            <div className="min-w-0 space-y-1">
              <p className="font-medium text-[var(--wx-ink)]">{row.label}</p>
              <p className="wx-text-meta text-[var(--wx-muted)]">{row.use}</p>
              <p className="wx-text-meta tabular-nums text-[color-mix(in_srgb,var(--wx-muted)_80%,transparent)]">
                {row.px} box
              </p>
            </div>
            <motion.div
              className="flex shrink-0 items-center justify-center rounded-lg bg-[var(--wx-white)] p-6 ring-1 ring-[color:var(--wx-border-soft)] sm:p-8"
              whileHover={reduceMotion ? undefined : { scale: 1.04, rotate: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "tween", duration: 0.28, ease: WX_EASE }}
            >
              <MaskedFigmaIcon
                src={SITE_FIGMA_ASSETS.logoMark}
                className={`${row.className} shrink-0 select-none`}
                background={WX_WORDMARK_MARK_GRADIENT}
              />
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
