import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// @/ resolves to this app's own src (the embedded /exploration demos live in
// src/exploration). central-icons ships pre-installed via the lockfile.
const appSrc = fileURLToPath(new URL("./src", import.meta.url));
const centralIcons = fileURLToPath(new URL("./node_modules/central-icons", import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, "/");
          if (!normalizedId.includes("/node_modules/")) return undefined;
          if (normalizedId.includes("/node_modules/motion/")) {
            return "vendor-motion";
          }
          if (
            normalizedId.includes("/node_modules/@phosphor-icons/") ||
            normalizedId.includes("/node_modules/central-icons/")
          ) {
            return "vendor-icons";
          }
          if (normalizedId.includes("/node_modules/gsap/")) {
            return "vendor-gsap";
          }
          if (normalizedId.includes("/node_modules/@paper-design/")) {
            return "vendor-shaders";
          }
          return undefined;
        },
      },
    },
  },
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
      "central-icons/IconColorPalette",
      "central-icons/IconCompassRound",
      "central-icons/IconEyeOpen",
      "central-icons/IconFolder1",
      "central-icons/IconRaisingHand5Finger",
      "central-icons/IconTouch",
      "central-icons/IconUser",
    ],
  },
  server: {
    port: Number(process.env.PORT) || 5180,
  },
});
