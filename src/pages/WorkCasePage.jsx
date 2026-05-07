import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getWorkCasePageContext } from "@/data/work-cases.js";
import { AvanceCaseStudy } from "@/case-studies/AvanceCaseStudy.jsx";
import { IncityCaseStudy } from "@/case-studies/IncityCaseStudy.jsx";
import { ResolutionsCaseStudy } from "@/case-studies/ResolutionsCaseStudy.jsx";
import { SirenCaseStudy } from "@/case-studies/SirenCaseStudy.jsx";
import { ExplorationBody, ExplorationMainPanels } from "@/exploration/layout/ExplorationLayout.jsx";
import { WorkCaseLayout } from "@/exploration/layout/WorkCaseLayout.jsx";
import { CaseStudyAside } from "@/exploration/CaseStudyAside.jsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

const CASE_STUDY_BY_SLUG = {
  avance: AvanceCaseStudy,
  incity: IncityCaseStudy,
  siren: SirenCaseStudy,
  resolutions: ResolutionsCaseStudy,
};

/**
 * Two-column case study shell — Figma `Testing/10:5` rhythm:
 * • LEFT: editorial source (year/title/lede + meta + tags).
 * • RIGHT: media-led gallery the case study renders.
 */
function CaseStudyShell({ def, gridEntry, CaseStudy, location, navigate }) {
  return (
    <ExplorationBody>
      <CaseStudyAside def={def} gridEntry={gridEntry} location={location} navigate={navigate} />
      <ExplorationMainPanels
        as="main"
        data-site-region="case-panels"
        aria-label={`${def.title} — case study media`}
      >
        <CaseStudy def={def} />
      </ExplorationMainPanels>
    </ExplorationBody>
  );
}

export function WorkCasePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ctx = slug ? getWorkCasePageContext(slug) : null;
  const reduceMotion = useReducedMotion();

  if (!ctx || !slug) return <Navigate to="/" replace />;

  const { def, gridEntry } = ctx;
  const CaseStudy = CASE_STUDY_BY_SLUG[slug];
  if (!CaseStudy) return <Navigate to="/" replace />;

  return (
    <WorkCaseLayout reduceMotion={reduceMotion}>
      <CaseStudyShell def={def} gridEntry={gridEntry} CaseStudy={CaseStudy} location={location} navigate={navigate} />
    </WorkCaseLayout>
  );
}
