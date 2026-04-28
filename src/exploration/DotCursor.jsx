import { useEffect, useRef } from "react";

/** Small dot following the pointer — exploration home only; skipped when reduced motion. */
export function DotCursor({ reduceMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const onMove = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  if (reduceMotion) return null;
  return <div ref={ref} className="wx-dot-cursor" aria-hidden />;
}
