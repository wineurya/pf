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
import { CaseStudyAside } from "@/exploration/CaseStudyAside.jsx";
import { useCaseStudyScrollSpy } from "@/exploration/useCaseStudyScrollSpy.js";
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

/**
 * Split body for chaptered cases — mirrors the home `ExplorationBody` (`aside`+`panels`),
 * keeps `site-vt--aside` / `site-vt--panels` intact for the staged route morph.
 * Active chapter is driven by `useCaseStudyScrollSpy` (GSAP ScrollTrigger).
 */
function CaseStudySplitBody({ def, CaseStudy, reduceMotion }) {
  const chapters = def.chapters;
  const sectionIds = useMemo(() => chapters.map((c) => c.id), [chapters]);
  const activeIndex = useCaseStudyScrollSpy(sectionIds);

  return (
    <div
      className="relative z-[2] flex w-full min-h-dvh flex-col lg:min-h-0 lg:flex-row"
      data-site-body="case-split"
    >
      <CaseStudyAside def={def} chapters={chapters} activeIndex={activeIndex} reduceMotion={reduceMotion} />
      <div
        className="site-vt--panels relative z-10 flex w-full min-w-0 shrink-0 flex-col gap-[var(--wx-gallery-gap)] px-[var(--wx-pad-x)] pb-24 pt-10 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-3 lg:pl-3 lg:pr-[var(--wx-pad-x)] lg:pt-12"
        data-site-region="case-panels"
      >
        <CaseStudy def={def} />
      </div>
    </div>
  );
}

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

  const hasChapters = Array.isArray(def.chapters) && def.chapters.length > 0;

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
      {hasChapters ? (
        <CaseStudySplitBody def={def} CaseStudy={CaseStudy} reduceMotion={reduceMotion} />
      ) : (
        <div
          className="site-vt--panels relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-[var(--wx-pad-x)] pb-24 pt-12"
          data-site-region="work-case-panels"
        >
          <CaseStudy def={def} />
        </div>
      )}
    </WorkCaseLayout>
  );
}
