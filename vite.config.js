import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "motion", "motion/react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("gsap")) return "gsap";
          if (id.includes("lenis")) return "lenis";
          if (id.includes("framer-motion") || id.includes("node_modules/motion/")) {
            return "motion";
          }
          if (id.includes("react-dom")) return "react-dom";
          if (id.includes("/react/")) return "react";
        },
      },
    },
  },
});
