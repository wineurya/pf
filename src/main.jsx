import "@fontsource-variable/nunito/wght.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "@/App.jsx";
import { ErrorBoundary } from "@/components/ErrorBoundary.jsx";
import NotFound from "@/pages/NotFound.jsx";
import { NuggetTestPage } from "@/pages/NuggetTestPage.jsx";
import { LenisProvider } from "@/providers/LenisProvider.jsx";
import { MotionProvider } from "@/providers/MotionProvider.jsx";
import "@/lib/gsap.js";
import "@/index.css";

const baseUrl = import.meta.env.BASE_URL ?? "/";
const routerBasename = baseUrl === "/" ? undefined : baseUrl.replace(/\/$/, "");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <MotionProvider>
        <LenisProvider>
          <BrowserRouter basename={routerBasename}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/nugget_test" element={<NuggetTestPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LenisProvider>
      </MotionProvider>
    </ErrorBoundary>
  </StrictMode>,
);
