import { Route, Routes } from "react-router-dom";
import { AnimatedOutlet } from "@/components/AnimatedOutlet.jsx";
import { WinnieExplorationPage } from "@/exploration/WinnieExplorationPage.jsx";
import { WorkCasePage } from "@/pages/WorkCasePage.jsx";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-fg)] focus:px-3 focus:py-2 focus:text-sm focus:text-[var(--color-bg)]"
      >
        Skip to content
      </a>
      <main id="main" className="canvas-root min-h-dvh">
        <Routes>
          <Route path="/" element={<AnimatedOutlet />}>
            <Route index element={<WinnieExplorationPage />} />
            <Route path="work/:slug" element={<WorkCasePage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
