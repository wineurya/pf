import { CaseStudyMediaStack } from "@/case-studies/CaseStudyMediaStack.jsx";

/**
 * Avance — skeleton-only image stack. Right column carries no editorial text
 * yet; chapter copy lives in `def.chapters` for future image swap-in.
 */
const AVANCE_ROWS = [
  { ratio: "16/9", frames: [{ flex: true }] },
  { ratio: "5/4", frames: [{ flex: true }, { flex: true }] },
  { ratio: "16/9", frames: [{ flex: true }] },
  { ratio: "5/4", frames: [{ basis: "40%" }, { flex: true }] },
  { ratio: "16/10", frames: [{ flex: true }] },
];

export function AvanceCaseStudy() {
  return <CaseStudyMediaStack rows={AVANCE_ROWS} />;
}
