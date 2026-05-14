import { motion } from "motion/react";
import { clsx } from "clsx";
import { CaseStudyFillerRect } from "@/case-studies/CaseStudyFillerRect.jsx";

const ROW_REVEAL_T = { duration: 0.5, ease: [0.19, 1, 0.22, 1] };

/**
 * Small kicker shown above a row group when a row carries chapter editorial framing.
 */
function ChapterAnchorHeader({ chapter }) {
  if (!chapter) return null;
  return (
    <div className="mb-3 flex flex-col gap-1 text-left">
      {chapter.eyebrow ? (
        <p className="wx-text-meta wx-text-kicker text-[var(--wx-muted)]">{chapter.eyebrow}</p>
      ) : null}
      {chapter.title ? (
        <h2 className="wx-text-subsection-title text-balance text-[var(--wx-ink)]">{chapter.title}</h2>
      ) : null}
    </div>
  );
}

function MediaRowFrames({ row }) {
  const frames = row.frames ?? [];
  return (
    <div
      className={clsx(
        "flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-stretch",
        row.gap === "lg" ? "sm:gap-4" : "sm:gap-3",
      )}
    >
      {frames.map((f, fi) => {
        const fillHeight =
          f.fillHeight ??
          (frames.length > 1 && Boolean(f.basis) && f.flex !== true);
        return (
          <div
            key={fi}
            className={clsx(
              "wx-case-media-frame flex min-h-0 min-w-0 flex-col sm:self-stretch",
              f.flex ? "min-w-0 flex-1" : null,
            )}
            style={f.basis ? { ["--wx-case-frame-basis"]: f.basis } : undefined}
            data-case-frame-basis={f.basis ? "" : undefined}
          >
            <CaseStudyFillerRect
              ratio={f.ratio ?? row.ratio ?? "16/10"}
              rounded={f.rounded ?? "lg"}
              fillHeight={fillHeight}
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * One row of the gallery (single, 2-up, narrow + wide, etc.). Wrapped in a
 * `<section>` when `chapterId` is set so anchors resolve for deep links / scroll.
 */
function MediaRow({ row, index, anchorId, chapter }) {
  const Tag = anchorId ? motion.section : motion.div;

  return (
    <Tag
      id={anchorId}
      data-case-row-index={index}
      data-case-chapter-index={chapter ? index : undefined}
      className={clsx(
        "wx-case-row relative flex w-full flex-col",
        anchorId && "scroll-mt-20 lg:scroll-mt-24",
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={ROW_REVEAL_T}
    >
      {chapter ? <ChapterAnchorHeader chapter={chapter} /> : null}
      <MediaRowFrames row={row} />
    </Tag>
  );
}

/**
 * Vertical media-led gallery — Figma `Testing 10:5` right column rhythm. Each
 * `row` is one band of frames; pass `chapter` per row to show eyebrow/title headers.
 *
 * `rows`: Array<{
 *   ratio?: string;                  // default ratio for frames in the row
 *   gap?: "md" | "lg";
 *   chapterId?: string;              // optional DOM id on `<section>` (anchors / scroll link-in)
 *   chapter?: { eyebrow?: string; title?: string };
 *   frames: Array<{ ratio?: string; flex?: boolean; basis?: string; rounded?: string; fillHeight?: boolean }>;
 * }>
 */
export function CaseStudyMediaStack({ rows }) {
  if (!rows?.length) return null;
  return (
    <div
      className="flex w-full min-w-0 flex-col gap-3 sm:gap-4"
      data-case-stack="media"
    >
      {rows.map((row, i) => (
        <MediaRow
          key={row.chapterId ?? `row-${i}`}
          row={row}
          index={i}
          anchorId={row.chapterId}
          chapter={row.chapter}
        />
      ))}
    </div>
  );
}
