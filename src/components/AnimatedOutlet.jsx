import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "@/providers/LenisProvider.jsx";

/**
 * Subtle page cross-fade; prefers-reduced-motion shortens the tween.
 * Root view-transition names are handled in CSS (see `work-case.css` import on case routes).
 */
export function AnimatedOutlet() {
  const location = useLocation();
  const lenis = useLenis();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = (e) => setReduce(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, lenis]);

  const t = reduce ? 0.01 : 0.32;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="min-h-dvh"
        initial={{ opacity: 0, y: reduce ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -4 }}
        transition={{ duration: t, ease: [0.32, 0, 0.24, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
