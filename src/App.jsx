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
const NotFound = lazy(() =>
  import("@/pages/NotFound.jsx").then((m) => ({ default: m.NotFound })),
);
const KinetixPage = lazy(() => import("@/pages/design/KinetixPage.jsx"));
const LogoExplorationPage = lazy(() => import("@/pages/design/LogoExplorationPage.jsx"));
const DesignSystemPage = lazy(() => import("@/pages/design/DesignSystemPage.jsx"));
const HomeStaticPage = lazy(() => import("@/pages/HomeStaticPage.jsx"));
const WireframeHomePage = lazy(() => import("@/pages/WireframeHomePage.jsx"));
const RebuildPage = lazy(() => import("@/rebuild/RebuildPage.jsx"));

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
            <Route path="/design/system" element={<DesignSystemPage />} />
            <Route path="/design/logo-exploration" element={<LogoExplorationPage />} />
            <Route path="/design/kinetix" element={<KinetixPage />} />
            <Route path="/figma/home" element={<HomeStaticPage />} />
            <Route path="/wireframe/home" element={<WireframeHomePage />} />
            <Route path="/rebuild" element={<RebuildPage />} />
            <Route
              path="/design"
              element={<Navigate to="/design/kinetix" replace />}
            />
            <Route path="/" element={<AnimatedOutlet />}>
              <Route index element={<ExplorationHomePage />} />
              <Route path="work/:slug" element={<WorkCasePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </CanvasRoot>
    </>
  );
}
