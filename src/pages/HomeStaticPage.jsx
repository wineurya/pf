import { clsx } from "clsx";
import {
  ExplorationBody,
  ExplorationRoot,
} from "@/exploration/layout/ExplorationLayout.jsx";
import {
  ExplorationPageAside,
  ExplorationPageMainColumn,
  useExplorationLayoutModel,
} from "@/exploration/ExplorationHomePage.jsx";

/**
 * Static, animation-free mirror of `ExplorationHomePage` for Figma export
 * via html.to.design. Reuses the exact same component tree as the live home
 * page so each section/aside/card maps 1:1 to a Figma layer. The only
 * difference is `reduceMotion={true}` is forced everywhere — motion components
 * mount in their final state, the techstack arc freezes with logos pinned at
 * their static positions, and hover-only effects stay visible at rest.
 *
 * Route: `/figma/home` (see `App.jsx`).
 */
export function HomeStaticPage() {
  const model = useExplorationLayoutModel();
  const staticProps = { ...model, reduceMotion: true };
  return (
    <ExplorationRoot
      reduceMotion={true}
      data-empty-canvas={model.emptyProjectFocus ? "true" : undefined}
      data-figma-export="true"
    >
      <ExplorationBody
        className={clsx(
          model.emptyProjectFocus && "lg:min-h-0 lg:items-start lg:overflow-x-clip",
        )}
      >
        <ExplorationPageAside {...staticProps} />
        <ExplorationPageMainColumn {...staticProps} />
      </ExplorationBody>
    </ExplorationRoot>
  );
}

export default HomeStaticPage;
