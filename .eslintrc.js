// @ts-check
/* eslint-env node */

const { resolve } = require("path");

process.env.ESLINT_PATH_BABELCONFIG = resolve("./src/client/babel.config.js");
process.env.ESLINT_PATH_TSCONFIG = resolve("./tsconfig.eslint.json");

/** @type {import("eslint").Linter.Config} */
const baseEslintConfig = {
    extends: ["jacobfischer-react", "jacobfischer"],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
};

module.exports = baseEslintConfig;
