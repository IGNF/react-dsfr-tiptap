import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // resolve: {
    //     alias: {
    //         "~": path.resolve(__dirname, "..", "./node_modules"),
    //     },
    // },
    build: {
        // Vite 8 uses lightningcss by default, but DSFR icon stylesheets contain
        // non-standard IE10 media query hacks (min-width: 0\0) that lightningcss
        // rejects. Fall back to esbuild for CSS minification.
        cssMinify: "esbuild",
    },
});
