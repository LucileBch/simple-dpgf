import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
    },
    // server: {
    //   proxy: {
    //     "/api": {
    //       target: "http://localhost:8080", // URL de votre backend
    //       changeOrigin: true, // Change l'origine pour correspondre à celle du backend
    //       secure: false, // Désactiver SSL pour localhost
    //       // rewrite: (path) => path.replace(/^\/api/, ""), // Optionnel : réécrit le chemin
    //     },
    //   },
    // },
});
