/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    setupFilesAfterEnv: ["./jest-setup.ts"],
    testEnvironment: "jsdom",
    transform: {
        "^.+.[jt]sx?$": ["ts-jest", {}],
    },
    // Transform ESM packages used by @tiptap/markdown (and allow DSFR package)
    // marked ships ESM only which Jest needs to transform when imported from node_modules
    transformIgnorePatterns: ["/node_modules/(?!(@codegouvfr|@tiptap/markdown|marked)/)"],
    moduleNameMapper: {
        "\\.css$": "<rootDir>/__mocks__/styleMock.ts",
    },
};
