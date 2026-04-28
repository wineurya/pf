import { useMemo, useRef } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getWorkCaseOrNull } from "@/data/work-cases.js";
import { AvanceCaseStudy } from "@/case-studies/AvanceCaseStudy.jsx";
import { IncityCaseStudy } from "@/case-studies/IncityCaseStudy.jsx";
import { ResolutionsCaseStudy } from "@/case-studies/ResolutionsCaseStudy.jsx";
import { SirenCaseStudy } from "@/case-studies/SirenCaseStudy.jsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { WorkCaseLayout } from "@/exploration/layout/WorkCaseLayout.jsx";
import { WorkCasePageHeader } from "@/exploration/WorkCasePageHeader.jsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.36;
const WX_TAB_MICRO_DURATION = 0.28;
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];

const CASE_STUDY_BY_SLUG = {
  avance: AvanceCaseStudy,
  incity: IncityCaseStudy,
  siren: SirenCaseStudy,
  resolutions: ResolutionsCaseStudy,
};

export function WorkCasePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const def = slug ? getWorkCaseOrNull(slug) : null;
  const reduceMotion = useReducedMotion();
  const tabRowRef = useRef(null);

  const tabPillTransition = useMemo(
    () => (reduceMotion ? { duration: 0 } : { duration: WX_TAB_PILL_DURATION, ease: WX_TAB_PILL_EASE }),
    [reduceMotion],
  );
  const tabMicroTransition = useMemo(
    () => (reduceMotion ? { duration: 0.01 } : { duration: WX_TAB_MICRO_DURATION, ease: WX_TAB_EASE_IN_OUT }),
    [reduceMotion],
  );

  if (!def || !slug) return <Navigate to="/" replace />;

  const CaseStudy = CASE_STUDY_BY_SLUG[slug];
  if (!CaseStudy) return <Navigate to="/" replace />;

  const onSelectSection = (sectionId) => {
    navigateWithViewTransition(navigate, { pathname: "/", hash: `#${sectionId}` });
  };

  return (
    <WorkCaseLayout>
      <WorkCasePageHeader
        location={location}
        navigate={navigate}
        onSelectSection={onSelectSection}
        selectedIndex={0}
        reduceMotion={reduceMotion}
        tabPillTransition={tabPillTransition}
        tabMicroTransition={tabMicroTransition}
        tabRowRef={tabRowRef}
      />
      <div
        className="site-vt--panels relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-[var(--wx-pad-x)] pb-24 pt-12"
        data-site-region="work-case-panels"
      >
        <CaseStudy def={def} />
      </div>
    </WorkCaseLayout>
  );
}
