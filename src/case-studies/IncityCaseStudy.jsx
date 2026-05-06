import { CaseStudyMediaStack } from "@/case-studies/CaseStudyMediaStack.jsx";

/** InCity — Figma `Testing/10:5` cadence: hero, 2-up, hero, narrow+wide. */
const INCITY_ROWS = [
  { ratio: "16/8.5", frames: [{ flex: true }] },
  { ratio: "5/4", frames: [{ flex: true }, { flex: true }] },
  { ratio: "16/9", frames: [{ flex: true }] },
  { ratio: "5/4", frames: [{ basis: "42%" }, { flex: true }] },
];

export function IncityCaseStudy() {
  return <CaseStudyMediaStack rows={INCITY_ROWS} />;
}
