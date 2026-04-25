import { Navigate, useParams } from "react-router-dom";
import { getWorkCaseOrNull } from "@/data/work-cases.js";
import { CaseEditorialTemplate } from "@/pages/case-templates/CaseEditorialTemplate.jsx";
import { CaseHeroTemplate } from "@/pages/case-templates/CaseHeroTemplate.jsx";
import { CaseStepsTemplate } from "@/pages/case-templates/CaseStepsTemplate.jsx";

const byTemplate = {
  hero: CaseHeroTemplate,
  steps: CaseStepsTemplate,
  editorial: CaseEditorialTemplate,
};

export function WorkCasePage() {
  const { slug } = useParams();
  const def = slug ? getWorkCaseOrNull(slug) : null;
  if (!def) return <Navigate to="/" replace />;

  const Cmp = byTemplate[def.template];
  if (!Cmp) return <Navigate to="/" replace />;

  return (
    <div className="winnie-exploration min-h-dvh w-full text-[var(--color-fg)]">
      <Cmp data={def} />
    </div>
  );
}
