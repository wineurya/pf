import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// @/ resolves to this app's own src (the embedded /exploration demos live in
// src/exploration). central-icons ships pre-installed via the lockfile.
const appSrc = fileURLToPath(new URL("./src", import.meta.url));
const centralIcons = fileURLToPath(new URL("./node_modules/central-icons", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom", "motion", "gsap"],
    alias: {
      "@": appSrc,
      "central-icons": centralIcons,
    },
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "motion",
      "motion/react",
      "gsap",
      "@phosphor-icons/react",
      "central-icons/IconUser",
      "central-icons/IconSuitcaseWork",
      "central-icons/IconCompassRound",
      "central-icons/IconColorPalette",
      "central-icons/IconEyeOpen",
      "central-icons/IconTouch",
      "central-icons/IconRaisingHand5Finger",
    ],
  },
  server: {
    port: Number(process.env.PORT) || 5180,
  },
});
