import { useMemo } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getWorkCaseOrNull } from "@/data/work-cases.js";
import { AvanceCaseStudy } from "@/case-studies/AvanceCaseStudy.jsx";
import { IncityCaseStudy } from "@/case-studies/IncityCaseStudy.jsx";
import { ResolutionsCaseStudy } from "@/case-studies/ResolutionsCaseStudy.jsx";
import { SirenCaseStudy } from "@/case-studies/SirenCaseStudy.jsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { ExplorationBody } from "@/exploration/layout/ExplorationLayout.jsx";
import { WorkCaseLayout } from "@/exploration/layout/WorkCaseLayout.jsx";
import { CaseStudyAside } from "@/exploration/CaseStudyAside.jsx";
import { useCaseStudyScrollSpy } from "@/exploration/useCaseStudyScrollSpy.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

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
function CaseStudySplitBody({ def, CaseStudy, reduceMotion, location, navigate, onSelectSection }) {
  const chapters = def.chapters;
  const sectionIds = useMemo(() => chapters.map((c) => c.id), [chapters]);
  const activeIndex = useCaseStudyScrollSpy(sectionIds);

  return (
    <ExplorationBody>
      <CaseStudyAside
        def={def}
        chapters={chapters}
        activeIndex={activeIndex}
        reduceMotion={reduceMotion}
        location={location}
        navigate={navigate}
        onSelectSection={onSelectSection}
        selectedIndex={0}
      />
      <div
        className="site-vt--panels relative z-10 flex w-full min-w-0 shrink-0 flex-col gap-12 px-[var(--wx-pad-x)] pb-28 pt-12 sm:gap-14 lg:min-w-0 lg:flex-1 lg:basis-0 lg:gap-16 lg:px-3 lg:pl-3 lg:pr-[var(--wx-pad-x)] lg:pb-32 lg:pt-14"
        data-site-region="case-panels"
      >
        <CaseStudy def={def} />
      </div>
    </ExplorationBody>
  );
}

export function WorkCasePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const def = slug ? getWorkCaseOrNull(slug) : null;
  const reduceMotion = useReducedMotion();

  if (!def || !slug) return <Navigate to="/" replace />;

  const CaseStudy = CASE_STUDY_BY_SLUG[slug];
  if (!CaseStudy) return <Navigate to="/" replace />;

  const onSelectSection = (sectionId) => {
    navigateWithViewTransition(navigate, { pathname: "/", hash: `#${sectionId}` });
  };

  const hasChapters = Array.isArray(def.chapters) && def.chapters.length > 0;

  return (
    <WorkCaseLayout reduceMotion={reduceMotion}>
      {hasChapters ? (
        <CaseStudySplitBody
          def={def}
          CaseStudy={CaseStudy}
          reduceMotion={reduceMotion}
          location={location}
          navigate={navigate}
          onSelectSection={onSelectSection}
        />
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
