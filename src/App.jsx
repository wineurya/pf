import { WinnieExplorationPage } from "@/exploration/WinnieExplorationPage.jsx";

export default function App() {
  return (
    <>
      <a
        href="#winnie-section-work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-fg)] focus:px-3 focus:py-2 focus:text-sm focus:text-[var(--color-bg)]"
      >
        Skip to content
      </a>
      <main id="main" className="canvas-root min-h-dvh">
        <WinnieExplorationPage />
      </main>
    </>
  );
}
