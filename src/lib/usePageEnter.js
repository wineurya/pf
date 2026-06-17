import { useEffect } from "react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "./hooks.js";

/** Subtle GSAP polish on first paint — backdrop breathes in. */
export function usePageEnter(ready) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ready || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".backdrop__img", {
        opacity: 0,
        scale: 1.06,
        duration: 1.15,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [ready, reducedMotion]);
}
