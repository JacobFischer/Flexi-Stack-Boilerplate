// @ts-check
/* eslint-env node */

const { resolve } = require("path");

// const ENABLED_ERROR = "error";
const ENABLED_WARNING = "warn";

/** @type {import("eslint").Linter.Config} */
const baseEslintConfig = {
    env: {
        es6: true,
        "shared-node-browser": true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: resolve("./tsconfig.json"),
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
        babelOptions: {
            configFile: resolve("./src/client/babel.config.js"),
        },
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "eslint-plugin-import-order-alphabetical",
        "jsdoc",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:jsdoc/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    rules: {
        // React
        "react/prop-types": "off", // TypeScript handles props' types at build time, much better than runtime.
        "react/display-name": "off", // Babel plugin now injects display name
        "react/jsx-one-expression-per-line": "off", // need to allow 1 expression literals multiple times, e.g. <p>Hello {firstName} {lastName}!</p>

        // TypeScript
        "@typescript-eslint/explicit-function-return-type": "off", // For now does not allow enough control over arrow functions, always requiring return types even on simple reducers and such.

        // JSDoc
        "jsdoc/no-types": 1, // all jsdoc type rules disabled because TypeScript
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/no-undefined-types": "off",
        "jsdoc/check-indentation": [ENABLED_WARNING],
        "jsdoc/require-description": [ENABLED_WARNING],
        "jsdoc/require-description-complete-sentence": [ENABLED_WARNING],
        "jsdoc/require-hyphen-before-param-description": [ENABLED_WARNING, "always"],
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        jsdoc: {
            mode: "typescript",
        },
    },
};

module.exports = baseEslintConfig;
