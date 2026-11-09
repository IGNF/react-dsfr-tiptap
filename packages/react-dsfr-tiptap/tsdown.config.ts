import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/index.ts", "src/dialog.ts", "src/markdown.ts"],
    format: ["cjs", "esm"],
    // Browser library: tsdown would otherwise infer a Node target from "engines"
    platform: "neutral",
    target: "es2020",
    // Keep the published file names: .js (ESM, "type": "module") and .cjs
    fixedExtension: false,
    dts: true,
    clean: true,
    // Imported CSS is extracted into dist/index.css (published as "react-dsfr-tiptap/index.css")
    css: {
        fileName: "index.css",
    },
    // Only the ProseMirror stylesheet may be bundled: any other dependency must stay external
    deps: {
        onlyBundle: ["prosemirror-view"],
    },
});
