/**
 * Rebuild · Case Study aside.
 *
 * Mirrors `RebuildAside`'s anatomy so the case study reads in the same
 * register as the home hero: wordmark cluster, eyebrow w/ accent dot, big
 * display title, lede paragraph, meta grid, tag rail, CTA pair.
 *
 * Used inside the sticky desktop column on the case study page.
 */

import { clsx } from "clsx";
import { RB_FONT_VAR, rbRegular, rbSemibold } from "@/rebuild/rebuildTypography.js";
import { REBUILD_ASSETS, REBUILD_WORDMARK_DOT_GRADIENT } from "@/rebuild/data/assets.js";
import { RebuildSectionKicker } from "@/rebuild/components/RebuildSectionKicker.jsx";

function WordmarkDot() {
  const url = REBUILD_ASSETS.wordmarkDotMask;
  return (
    <div className="relative size-3 shrink-0">
      <div
        className="absolute left-0 top-0 size-3"
        style={{
          backgroundImage: REBUILD_WORDMARK_DOT_GRADIENT,
          maskImage: `url('${url}')`,
          WebkitMaskImage: `url('${url}')`,
          maskSize: "12px 12px",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
        aria-hidden
      />
    </div>
  );
}

/** Wordmark + back-to-work link. Replaces the home page's tab rail. */
function CaseStudyAsideNav() {
  return (
    <div
      className="flex w-full min-w-0 shrink-0 items-center justify-between gap-4 max-sm:gap-6 sm:gap-6"
      data-cs-aside-nav
    >
      <div className="flex min-w-0 shrink-0 flex-col items-start justify-center">
        <div className="flex w-full items-center justify-between">
          <div
            className={clsx(
              "flex shrink-0 flex-col justify-center text-[16px] leading-[0] text-[var(--wx-ink)]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
          >
            <p className="m-0 leading-[17.92px]">wineury</p>
          </div>
          <div className="relative flex shrink-0 items-start pt-px">
            <WordmarkDot />
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col items-start">
          <div className="flex shrink-0 items-center gap-1">
            <div className="relative flex shrink-0 items-start pt-px">
              <WordmarkDot />
            </div>
            <div className="relative flex shrink-0 flex-col items-start">
              <div
                className={clsx(
                  "flex shrink-0 flex-col justify-center text-[16px] leading-[0] text-[var(--wx-ink)]",
                  rbSemibold,
                )}
                style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
              >
                <p className="m-0 leading-[17.92px]">almonte</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="/#rebuild-work"
        className={clsx(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[var(--wx-border-muted)] border-solid bg-[var(--wx-white)] px-[15px] py-[9px] text-[14px] leading-[0] text-[var(--wx-ink)] transition-transform duration-200 ease-out",
          rbSemibold,
          "hover:-translate-y-[1px]",
        )}
        style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
      >
        <span className="leading-[20px]">← Back to work</span>
      </a>
    </div>
  );
}

export function CaseStudyAside({ c }) {
  return (
    <div
      className="flex w-full min-h-0 flex-col items-start gap-8 max-sm:gap-10 sm:gap-10 max-[1431px]:px-4 max-sm:max-[1431px]:px-6 sm:max-[1431px]:px-6 min-[1432px]:min-h-[var(--rebuild-aside-desktop-band-min)] min-[1432px]:gap-10 min-[1432px]:px-0"
    >
      {/* Desktop: wordmark + back-to-work. Hidden under 1432px (mobile bar handles it). */}
      <div className="hidden w-full shrink-0 min-[1432px]:block">
        <CaseStudyAsideNav />
      </div>

      <div
        className="relative flex w-full max-[1431px]:shrink-0 min-w-0 flex-col items-start gap-8 max-sm:gap-10 sm:gap-10 text-left min-[1432px]:min-h-0 min-[1432px]:flex-1 min-[1432px]:justify-end min-[1432px]:gap-10"
      >
        <div className="relative z-10 flex w-full shrink-0 flex-col items-start gap-6 text-left">
          {/* Eyebrow — kicker pill + year/sector */}
          <div className="flex flex-wrap items-center gap-3">
            <RebuildSectionKicker label={c.kicker.label} accentHex={c.kicker.color} />
            <span
              className={clsx("text-[14px] text-[var(--wx-muted)]", rbRegular)}
              style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            >
              {c.year} · {c.sector}
            </span>
          </div>

          {/* Title block */}
          <div className="relative flex w-full min-w-0 flex-col gap-3">
            <h1
              className={clsx(
                "relative m-0 flex shrink-0 flex-wrap items-end whitespace-normal text-[32px] not-italic leading-[40px]",
                rbSemibold,
              )}
              style={{ fontFamily: "var(--font-display)", ...RB_FONT_VAR, color: "var(--wx-ink)" }}
            >
              <span>{c.title}.</span>
            </h1>

            <p
              className={clsx(
                "relative m-0 flex max-w-full shrink-0 flex-col items-start justify-center whitespace-normal text-left text-[16px] leading-[24px] text-[var(--wx-muted)]",
                rbRegular,
              )}
              style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
            >
              {c.lede}
            </p>
          </div>
        </div>

        {/* Meta grid */}
        <dl className="relative z-10 grid w-full shrink-0 grid-cols-2 gap-x-6 gap-y-4">
          <Meta label="Role" value={c.role} />
          <Meta label="Duration" value={c.duration} />
          <Meta label="Team" value={c.team} />
          <Meta label="Status" value={c.status} />
        </dl>

        {/* Tag rail */}
        <div className="relative z-10 flex w-full flex-wrap gap-2">
          {c.tags.map((t) => (
            <span
              key={t}
              className="cs-aside-tag"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA pair — same shape as the home page hero. */}
        <div className="relative z-10 flex w-full shrink-0 flex-wrap items-start justify-start gap-4 max-sm:gap-5 sm:gap-5">
          <a
            href={c.asideCtas[0].href}
            className={clsx(
              "relative isolate flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-solid px-[15px] py-[9px] text-[14px] leading-[20px] text-white transition-transform duration-200 ease-out hover:-translate-y-[1px]",
              rbSemibold,
            )}
            style={{
              borderColor: c.kicker.color,
              fontFamily: "var(--font-body)",
              ...RB_FONT_VAR,
              backgroundImage: `linear-gradient(180deg, color-mix(in srgb, var(--wx-white) 14%, transparent) 0%, transparent 100%), linear-gradient(90deg, ${c.kicker.color} 0%, ${c.kicker.color} 100%)`,
            }}
          >
            <span className="relative z-10">{c.asideCtas[0].label}</span>
          </a>
          <a
            href={c.asideCtas[1].href}
            className={clsx(
              "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[var(--wx-border-muted)] border-solid bg-[var(--wx-white)] px-[15px] py-[9px] text-[14px] leading-[20px] text-[var(--wx-ink)] transition-transform duration-200 ease-out hover:-translate-y-[1px]",
              rbSemibold,
            )}
            style={{ fontFamily: "var(--font-body)", ...RB_FONT_VAR }}
          >
            <span>{c.asideCtas[1].label}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="cs-aside-meta-label">{label}</dt>
      <dd className="cs-aside-meta-value m-0">{value}</dd>
    </div>
  );
}

/** Mobile-only top bar — replaces the desktop sticky aside for narrow viewports. */
export function CaseStudyMobileTopBar({ c }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <CaseStudyAsideNav />
    </div>
  );
}
