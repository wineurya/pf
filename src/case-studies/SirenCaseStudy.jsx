import { CaseStudyMediaStack } from "@/case-studies/CaseStudyMediaStack.jsx";

/** Siren — safety / trust narrative, three media beats. */
const SIREN_ROWS = [
  { ratio: "16/9", frames: [{ flex: true }] },
  { ratio: "4/5", frames: [{ flex: true }, { flex: true }] },
  { ratio: "16/9", frames: [{ flex: true }] },
];

export function SirenCaseStudy() {
  return <CaseStudyMediaStack rows={SIREN_ROWS} />;
}
