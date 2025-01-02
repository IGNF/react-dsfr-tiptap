/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    setupFilesAfterEnv: ["./jest-setup.ts"],
    testEnvironment: "jsdom",
    transform: {
        "^.+.[jt]sx?$": ["ts-jest", {}],
    },
    transformIgnorePatterns: ["/node_modules/(?!(@codegouvfr)/)"],
};
