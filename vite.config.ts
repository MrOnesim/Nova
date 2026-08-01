import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  appType: "mpa",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        demande: path.resolve(__dirname, "demande.html"),
        "mentions-legales": path.resolve(__dirname, "mentions-legales.html"),
        "politique-confidentialite": path.resolve(__dirname, "politique-confidentialite.html"),
        "gestion-cookies": path.resolve(__dirname, "gestion-cookies.html"),
        "information-precontractuelle": path.resolve(__dirname, "information-precontractuelle.html"),
        "reclamations": path.resolve(__dirname, "reclamations.html"),
        "404": path.resolve(__dirname, "404.html"),
        "comment-ca-marche": path.resolve(__dirname, "comment-ca-marche.html"),
        "avis": path.resolve(__dirname, "avis.html"),
        "faq": path.resolve(__dirname, "faq.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
