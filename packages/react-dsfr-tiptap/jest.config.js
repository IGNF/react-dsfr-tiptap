/** @type {import('jest').Config} **/
export default {
    setupFilesAfterEnv: ["./jest-setup.ts"],
    testEnvironment: "jsdom",
    // SWC only strips types: type errors are caught by `npm run check-types`
    transform: {
        "^.+\\.[jt]sx?$": [
            "@swc/jest",
            {
                jsc: {
                    parser: { syntax: "typescript", tsx: true },
                    transform: { react: { runtime: "automatic" } },
                },
                module: { type: "commonjs" },
            },
        ],
    },
    // Transform ESM packages used by @tiptap/markdown (and allow DSFR package)
    // marked ships ESM only which Jest needs to transform when imported from node_modules
    transformIgnorePatterns: ["/node_modules/(?!(@codegouvfr|@tiptap/markdown|marked)/)"],
    moduleNameMapper: {
        "\\.css$": "<rootDir>/__mocks__/styleMock.ts",
    },
};
