import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatedOutlet } from "@/components/AnimatedOutlet.jsx";
import { SkipToContentLink } from "@/shell/SkipToContentLink.jsx";
import { CanvasRoot } from "@/shell/CanvasRoot.jsx";

const ExplorationHomePage = lazy(() =>
  import("@/exploration/ExplorationHomePage.jsx").then((m) => ({ default: m.ExplorationHomePage })),
);
const WorkCasePage = lazy(() =>
  import("@/pages/WorkCasePage.jsx").then((m) => ({ default: m.WorkCasePage })),
);
const KinetixPage = lazy(() => import("@/pages/design/KinetixPage.jsx"));
const LogoExplorationPage = lazy(() => import("@/pages/design/LogoExplorationPage.jsx"));

function RouteFallback() {
  return (
    <div
      className="min-h-dvh w-full bg-[var(--color-bg)]"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading page"
    />
  );
}

export default function App() {
  return (
    <>
      <SkipToContentLink />
      <CanvasRoot>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/design/logo-exploration" element={<LogoExplorationPage />} />
            <Route path="/design/kinetix" element={<KinetixPage />} />
            <Route
              path="/design"
              element={<Navigate to="/design/kinetix" replace />}
            />
            <Route path="/" element={<AnimatedOutlet />}>
              <Route index element={<ExplorationHomePage />} />
              <Route path="work/:slug" element={<WorkCasePage />} />
            </Route>
          </Routes>
        </Suspense>
      </CanvasRoot>
    </>
  );
}
