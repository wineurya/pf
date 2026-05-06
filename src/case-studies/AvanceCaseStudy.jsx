import { CaseStudyMediaStack } from "@/case-studies/CaseStudyMediaStack.jsx";

/**
 * Avance — image-led chapter stack. Editorial copy lives in `CaseStudyAside`;
 * the right column is purely media (Figma `Testing/10:5` rhythm). Each chapter
 * id anchors a row group so `useCaseStudyScrollSpy` can drive the aside ToC.
 *
 * Layout cadence per chapter:
 *   • overview → wide hero
 *   • discovery → 2-up split
 *   • craft → wide block + narrow/wide split
 *   • outcome → 2-up split + finale wide
 */
function buildAvanceRows(chapters) {
  if (!chapters?.length) return null;
  return [
    {
      chapterId: chapters[0]?.id,
      chapter: chapters[0],
      ratio: "16/9",
      frames: [{ flex: true }],
    },
    {
      chapterId: chapters[1]?.id,
      chapter: chapters[1],
      ratio: "5/4",
      frames: [{ flex: true }, { flex: true }],
    },
    {
      chapterId: chapters[2]?.id,
      chapter: chapters[2],
      ratio: "16/9",
      frames: [{ flex: true }],
    },
    {
      ratio: "5/4",
      frames: [{ basis: "40%" }, { flex: true }],
    },
    {
      chapterId: chapters[3]?.id,
      chapter: chapters[3],
      ratio: "16/10",
      frames: [{ flex: true }],
    },
  ];
}

export function AvanceCaseStudy({ def }) {
  const rows = buildAvanceRows(def.chapters);
  if (!rows) return null;
  return <CaseStudyMediaStack rows={rows} />;
}
