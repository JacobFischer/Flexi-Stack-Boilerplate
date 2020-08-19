// @ts-check

const { resolve } = require("path");

/** @type {Partial<import("@jest/types/build/Config").InitialOptions>} */
const jestConfig = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "\\\\node_modules\\\\", // do not test external modules
        "(babel|webpack|jest).config.(js|ts)", // config files for frameworks/tools
        ".eslintrc.js", // config file for eslint
        // launchers for client/server. In truth they are tested, but these files are really an entry for webpack
        "src/(server|static)/index.ts(x?)",
        "src/client/", // client specific files are tested, but webpack bundled. Thus not coverage testable
    ],
    coverageReporters: ["text"],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 0,
        },
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "ts-jest",
    rootDir: resolve("./"),
    setupFiles: [resolve(__dirname, "./setup.ts")],
    testEnvironment: "node",
    testPathIgnorePatterns: [
        "/lib/",
        "/node_modules/",
        "/test/utils",
        "([^s]+).config.(js|ts|tsx)",
        ".eslintrc.js(on)?",
        "/test/(setup|babel-transformer).(t|j)sx?",
    ],
    testRegex: ["(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"],
    testTimeout: 15_000,
    transform: {
        "^.+\\.[t|j]sx?$": resolve(__dirname, "./babel-transformer.js"),
    },

    verbose: true,
};

module.exports = jestConfig;
