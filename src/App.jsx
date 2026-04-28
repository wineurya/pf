import { Route, Routes } from "react-router-dom";
import { AnimatedOutlet } from "@/components/AnimatedOutlet.jsx";
import { SkipToContentLink } from "@/shell/SkipToContentLink.jsx";
import { CanvasRoot } from "@/shell/CanvasRoot.jsx";
import { ExplorationHomePage } from "@/exploration/ExplorationHomePage.jsx";
import { WorkCasePage } from "@/pages/WorkCasePage.jsx";

export default function App() {
  return (
    <>
      <SkipToContentLink />
      <CanvasRoot>
        <Routes>
          <Route path="/" element={<AnimatedOutlet />}>
            <Route index element={<ExplorationHomePage />} />
            <Route path="work/:slug" element={<WorkCasePage />} />
          </Route>
        </Routes>
      </CanvasRoot>
    </>
  );
}
