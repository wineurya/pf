/**
 * Rebuild · Case Study page.
 *
 * Same 2-column shell as the rebuild homepage (sticky aside left at ≥1432px,
 * mobile fixed-bar fallback below). The aside is the project's masthead —
 * kicker, title, lede, meta, tags, CTAs.
 *
 * The main column is currently a creative editorial bento of empty frames:
 * varied shapes and aspect ratios in a six-column dense grid. Each frame is
 * a flat 12% #171717 fill at 16px radius — design placeholder mode so the
 * composition can be reviewed before any media lands.
 */

import "@/rebuild/rebuild.css";
import "@/rebuild/pages/caseStudy.css";
import { motion, useReducedMotion } from "motion/react";
import { REBUILD_ASSETS } from "@/rebuild/data/assets.js";
import { useRebuildTheme } from "@/rebuild/useRebuildTheme.js";
import { RebuildPersistentThemeToggle } from "@/rebuild/components/RebuildPersistentThemeToggle.jsx";
import { CaseStudyAside, CaseStudyMobileTopBar } from "@/rebuild/pages/CaseStudyAside.jsx";
import { SAMPLE_CASE } from "@/rebuild/data/caseStudy.js";

/**
 * Editorial bento composition — designed band-by-band so no gaps form.
 *
 * The grid uses a rastered `grid-auto-rows` (see caseStudy.css), and each
 * tile's `data-shape` resolves to a `(col-span × row-span)` pair. The order
 * below groups tiles into horizontal bands where the column-spans total 6
 * AND the row-spans match within the band — that's what makes
 * `grid-auto-flow: dense` pack perfectly with no empty cells.
 *
 *   Band 1 · hero               6×4
 *   Band 2 · wide + portrait    4+2 (3 rows)
 *   Band 3 · sq-sm × 3          2+2+2 (2 rows)
 *   Band 4 · panorama           6×3
 *   Band 5 · tall + wide-tall   2+4 (4 rows)
 *   Band 6 · half + half        3+3 (3 rows)
 *   Band 7 · wide-narrow + sq   4+2 (2 rows)
 *   Band 8 · portrait + wide    2+4 (3 rows) — mirror of band 2
 */
const BENTO = [
  "hero",         // band 1 — 6×4
  "wide",         // band 2 — 4×3
  "portrait",     //          2×3
  "sq-sm",        // band 3 — 2×2
  "sq-sm",        //          2×2
  "sq-sm",        //          2×2
  "panorama",     // band 4 — 6×3
  "tall",         // band 5 — 2×4
  "wide-tall",    //          4×4
  "half",         // band 6 — 3×3
  "half",         //          3×3
  "wide-narrow",  // band 7 — 4×2
  "sq-sm",        //          2×2
  "portrait",     // band 8 — 2×3
  "wide",         //          4×3
];

export default function CaseStudyPage() {
  const c = SAMPLE_CASE;
  const theme = useRebuildTheme();

  return (
    <div className="cs-page rebuild-page relative min-h-dvh w-full bg-[var(--wx-page-bg)]">
      {/* Bottom backdrop — same image as home so the case study sits on the
       *  same surface, just quieter (heavier fade via radial mask). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--rebuild-page-bg-img-h)] select-none">
        <img
          src={REBUILD_ASSETS.pageBackground}
          alt=""
          className="absolute size-full max-w-none object-cover object-bottom opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 140% 88% at 50% 90%, transparent 0%, color-mix(in oklch, var(--wx-page-bg) 92%, transparent) 55%, var(--wx-page-bg) 100%)",
          }}
        />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1600px] min-[1432px]:max-w-none min-[1432px]:w-full flex-col gap-10 py-8 max-sm:gap-12 max-sm:py-10 sm:py-12 max-[1431px]:px-[var(--wx-pad-x)] max-[1431px]:py-0 max-[1431px]:pb-8 min-[1432px]:flex-row min-[1432px]:items-stretch min-[1432px]:justify-between min-[1432px]:gap-6 min-[1432px]:px-16 min-[1432px]:py-0 min-[1432px]:pb-12">
        <div className="max-[1431px]:flex max-[1431px]:flex-col max-[1431px]:gap-0 min-[1432px]:contents">
          {/* Mobile sticky bar — wordmark + back-to-work. Mirrors home page. */}
          <div className="w-full min-w-0 min-[1432px]:hidden max-[1431px]:fixed max-[1431px]:inset-x-0 max-[1431px]:top-0 max-[1431px]:z-40 max-[1431px]:px-[var(--wx-pad-x)] max-[1431px]:transform-gpu">
            <div className="max-[1431px]:bg-[var(--wx-page-bg)] max-[1431px]:backdrop-blur-sm max-[1431px]:[backface-visibility:hidden]">
              <div className="max-[1431px]:pb-4 rebuild-mobile-header-pt">
                <div className="mx-auto w-full min-w-0 max-w-[var(--rebuild-stack-max)] max-[1431px]:px-4 max-sm:max-[1431px]:px-6 sm:max-[1431px]:px-6">
                  <CaseStudyMobileTopBar c={c} />
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

          {/* Desktop sticky aside */}
          <aside className="rebuild-page__aside mx-auto flex min-h-0 w-full min-w-0 max-w-[var(--rebuild-stack-max)] shrink-0 flex-col items-start min-[1432px]:mx-0 min-[1432px]:w-[419px] min-[1432px]:max-w-[419px] min-[1432px]:self-stretch">
            <div className="flex w-full min-h-0 flex-col min-[1432px]:sticky min-[1432px]:top-12 min-[1432px]:max-h-none min-[1432px]:self-start min-[1432px]:overflow-visible">
              <CaseStudyAside c={c} />
            </div>
          </aside>
        </div>

        {/* Main column — editorial bento of empty frames */}
        <article className="rebuild-page__main cs-main mx-auto flex w-full min-w-0 max-w-[var(--rebuild-stack-max)] flex-1 flex-col gap-8 rounded-b-3xl bg-[var(--wx-page-bg)] max-[1431px]:px-4 max-sm:max-[1431px]:px-6 sm:max-[1431px]:px-6 max-[1431px]:pb-10 max-[1431px]:pt-4 min-[1432px]:mx-0 min-[1432px]:max-w-none min-[1432px]:px-12 min-[1432px]:pb-0 min-[1432px]:pt-0">
          <Bento />
        </article>
      </div>

      <RebuildPersistentThemeToggle mode={theme.mode} onToggle={theme.toggle} />
    </div>
  );
}

/**
 * Render the bento grid as empty frames. Tiles fade in on scroll with a small
 * stagger so the composition reveals row by row rather than all at once.
 */
function Bento() {
  const reduced = useReducedMotion();
  return (
    <div className="cs-bento">
      {BENTO.map((shape, i) => (
        <motion.div
          key={`${shape}-${i}`}
          data-shape={shape}
          className="cs-bento-tile"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.55,
            delay: reduced ? 0 : Math.min(i * 0.04, 0.32),
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}
