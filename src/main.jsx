import "@fontsource-variable/nunito/wght.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "@/components/ErrorBoundary.jsx";
import App from "@/App.jsx";
import { LenisProvider } from "@/providers/LenisProvider.jsx";
import { MotionProvider } from "@/providers/MotionProvider.jsx";
import "@/lib/gsap.js";
import "@/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionProvider>
        <LenisProvider>
          <App />
        </LenisProvider>
      </MotionProvider>
    </ErrorBoundary>
  </StrictMode>,
);
