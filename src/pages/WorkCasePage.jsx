import { useMemo, useRef } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getWorkCaseOrNull } from "@/data/work-cases.js";
import { CaseEditorialTemplate } from "@/pages/case-templates/CaseEditorialTemplate.jsx";
import { CaseHeroTemplate } from "@/pages/case-templates/CaseHeroTemplate.jsx";
import { CaseStepsTemplate } from "@/pages/case-templates/CaseStepsTemplate.jsx";
import { navigateWithViewTransition } from "@/lib/navigateViewTransition.js";
import { WinnieTopNav } from "@/exploration/WinnieTopNav.jsx";
import { useReducedMotion } from "@/exploration/useReducedMotion.js";
import "@/exploration/styles/winnie-exploration.css";

const byTemplate = {
  hero: CaseHeroTemplate,
  steps: CaseStepsTemplate,
  editorial: CaseEditorialTemplate,
};

const WX_TAB_PILL_EASE = [0.22, 1, 0.36, 1];
const WX_TAB_PILL_DURATION = 0.36;
const WX_TAB_MICRO_DURATION = 0.28;
const WX_TAB_EASE_IN_OUT = [0.4, 0, 0.2, 1];

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

  if (!def) return <Navigate to="/" replace />;

  const Cmp = byTemplate[def.template];
  if (!Cmp) return <Navigate to="/" replace />;

  const onSelectSection = (sectionId) => {
    navigateWithViewTransition(navigate, { pathname: "/", hash: `#${sectionId}` });
  };

  return (
    <div className="winnie-exploration wx-work-case-chrome min-h-dvh w-full text-[var(--color-fg)]">
      <header className="wx-explore-top-header sticky top-0 z-30 w-full shrink-0 border-b border-[color:var(--wx-border-soft)]">
        <div className="px-[var(--wx-pad-x)] pb-2 pt-[max(0.5rem,env(safe-area-inset-top,0px))] sm:pb-2.5">
          <WinnieTopNav
            location={location}
            navigate={navigate}
            onSelectSection={onSelectSection}
            selectedIndex={0}
            reduceMotion={reduceMotion}
            tabPillTransition={tabPillTransition}
            tabMicroTransition={tabMicroTransition}
            tabRowRef={tabRowRef}
          />
        </div>
      </header>
      <div className="relative z-10">
        <Cmp data={def} />
      </div>
    </div>
  );
}
