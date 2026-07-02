import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";

import "./styles/fonts.css";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/app.css";
import "./styles/cursor.css";

import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
    >
      <App />
    </MotionConfig>
  </StrictMode>,
);
