import { useMemo } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getWorkCasePageContext } from "@/data/work-cases.js";
import { AvanceCaseStudy } from "@/case-studies/AvanceCaseStudy.jsx";
import { IncityCaseStudy } from "@/case-studies/IncityCaseStudy.jsx";
import { ResolutionsCaseStudy } from "@/case-studies/ResolutionsCaseStudy.jsx";
import { SirenCaseStudy } from "@/case-studies/SirenCaseStudy.jsx";
import { ExplorationBody } from "@/exploration/layout/ExplorationLayout.jsx";
import { WorkCaseLayout } from "@/exploration/layout/WorkCaseLayout.jsx";
import { CaseStudyAside } from "@/exploration/CaseStudyAside.jsx";
import { CaseStudyEditorialHeader } from "@/exploration/CaseStudyEditorialHeader.jsx";
import { useCaseStudyScrollSpy } from "@/exploration/useCaseStudyScrollSpy.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

const CASE_STUDY_BY_SLUG = {
  avance: AvanceCaseStudy,
  incity: IncityCaseStudy,
  siren: SirenCaseStudy,
  resolutions: ResolutionsCaseStudy,
};

/**
 * Split body for chaptered cases — narrow sticky rail + editorial column (see Figma Testing 10:5).
 */
function CaseStudySplitBody({ def, gridEntry, CaseStudy, reduceMotion, location, navigate }) {
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
      />
      <div
        className="site-vt--panels relative z-10 flex w-full min-w-0 shrink-0 flex-col gap-0 px-[var(--wx-pad-x)] pb-28 pt-12 sm:pt-14 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-3 lg:pl-4 lg:pr-[var(--wx-pad-x)] lg:pb-32 lg:pt-16"
        data-site-region="case-panels"
      >
        <CaseStudyEditorialHeader def={def} gridEntry={gridEntry} editorialMeta={def.editorialMeta} />
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <CaseStudy def={def} />
        </div>
      </div>
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

  const hasChapters = Array.isArray(def.chapters) && def.chapters.length > 0;

  return (
    <WorkCaseLayout reduceMotion={reduceMotion}>
      {hasChapters ? (
        <CaseStudySplitBody
          def={def}
          gridEntry={gridEntry}
          CaseStudy={CaseStudy}
          reduceMotion={reduceMotion}
          location={location}
          navigate={navigate}
        />
      ) : (
        <div
          className="site-vt--panels relative z-10 mx-auto flex w-full max-w-[min(1200px,100%)] flex-col gap-12 px-[var(--wx-pad-x)] pb-24 pt-12 sm:gap-14 sm:pt-14"
          data-site-region="work-case-panels"
        >
          <CaseStudyEditorialHeader def={def} gridEntry={gridEntry} editorialMeta={def.editorialMeta} />
          <CaseStudy def={def} />
        </div>
      )}
    </WorkCaseLayout>
  );
}
