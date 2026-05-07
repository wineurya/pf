import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary.jsx";
import App from "@/App.jsx";
import { LenisProvider } from "@/providers/LenisProvider.jsx";
import { MotionProvider } from "@/providers/MotionProvider.jsx";
import { MotionBudgetPause } from "@/shell/MotionBudgetPause.jsx";
import "@/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <MotionProvider>
          <MotionBudgetPause />
          <LenisProvider>
            <App />
          </LenisProvider>
        </MotionProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
