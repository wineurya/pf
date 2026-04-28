/**
 * Top-level **document canvas** (single `main#canvas-root`). All routes render inside this
 * for one consistent “page” region — pair with `SkipToContentLink` and route boundaries.
 */
export function CanvasRoot({ children }) {
  return (
    <main id="main" className="canvas-root min-h-dvh" data-app-canvas>
      {children}
    </main>
  );
}
