import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@/providers/LenisProvider.jsx";

/**
 * Wraps the routed view so each pathname gets a **stable DOM boundary** (keyed wrapper).
 * Pairs with `document.startViewTransition` + `work-case.css` — no Framer page cross-fade here.
 * Treat this as the **route shell**: fade/morph other layers, not the outlet identity itself.
 */
export function RouteContentBoundary({ children }) {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, lenis]);

  return (
    <div key={location.pathname} className="min-h-dvh" data-app-route-boundary>
      {children}
    </div>
  );
}
