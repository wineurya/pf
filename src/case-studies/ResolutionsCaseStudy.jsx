import { CaseStudyMediaStack } from "@/case-studies/CaseStudyMediaStack.jsx";

/** Resolutions — editorial vertical strips, four habit beats. */
const RESOLUTIONS_ROWS = [
  { ratio: "16/9", frames: [{ flex: true }] },
  { ratio: "5/4", frames: [{ flex: true }, { flex: true }] },
  { ratio: "16/8.5", frames: [{ flex: true }] },
  { ratio: "5/4", frames: [{ basis: "55%" }, { flex: true }] },
];

export function ResolutionsCaseStudy() {
  return <CaseStudyMediaStack rows={RESOLUTIONS_ROWS} />;
}
