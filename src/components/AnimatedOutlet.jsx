import { Outlet } from "react-router-dom";
import { RouteContentBoundary } from "@/shell/RouteContentBoundary.jsx";

/**
 * Route shell: `RouteContentBoundary` keys per pathname; no Framer page fade here
 * (see `work-case.css` + `navigateViewTransition`).
 */
export function AnimatedOutlet() {
  return (
    <RouteContentBoundary>
      <Outlet />
    </RouteContentBoundary>
  );
}
