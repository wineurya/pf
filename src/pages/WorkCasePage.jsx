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
import { useCaseStudyScrollSpy } from "@/exploration/useCaseStudyScrollSpy.js";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";

const CASE_STUDY_BY_SLUG = {
  avance: AvanceCaseStudy,
  incity: IncityCaseStudy,
  siren: SirenCaseStudy,
  resolutions: ResolutionsCaseStudy,
};

/**
 * Two-column case study shell — Figma `Testing/10:5` rhythm:
 * • LEFT: editorial source (year/title/lede + meta + tags + chapter rail).
 * • RIGHT: media-led gallery the case study renders.
 */
function CaseStudyShell({ def, gridEntry, CaseStudy, reduceMotion, location, navigate }) {
  const chapters = def.chapters ?? [];
  const sectionIds = useMemo(() => chapters.map((c) => c.id), [chapters]);
  const activeIndex = useCaseStudyScrollSpy(sectionIds);

  return (
    <ExplorationBody>
      <CaseStudyAside
        def={def}
        gridEntry={gridEntry}
        chapters={chapters}
        activeIndex={activeIndex}
        reduceMotion={reduceMotion}
        location={location}
        navigate={navigate}
      />
      <main
        className="site-vt--panels relative z-10 flex w-full min-w-0 shrink-0 flex-col gap-3 px-[var(--wx-pad-x)] pb-24 pt-10 sm:gap-4 sm:pt-12 lg:min-w-0 lg:flex-1 lg:basis-0 lg:px-6 lg:pb-16 lg:pt-12"
        data-site-region="case-panels"
        aria-label={`${def.title} — case study media`}
      >
        <CaseStudy def={def} />
      </main>
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
      <CaseStudyShell
        def={def}
        gridEntry={gridEntry}
        CaseStudy={CaseStudy}
        reduceMotion={reduceMotion}
        location={location}
        navigate={navigate}
      />
    </WorkCaseLayout>
  );
}
