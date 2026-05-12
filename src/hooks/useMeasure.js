import { useCallback, useEffect, useState } from "react";

/**
 * Tracks an element's content box via ResizeObserver — pair with Motion on an
 * *outer* wrapper animating width/height to measured values so bounds interpolate smoothly.
 *
 * See: https://www.userinterface.wiki/animating-container-bounds
 */
export function useMeasure() {
  const [element, setElement] = useState(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const ref = useCallback((node) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return undefined;

    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, bounds];
}
