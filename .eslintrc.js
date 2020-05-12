// @ts-check
/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require("path");

process.env.ESLINT_PATH_BABELCONFIG = resolve("./src/client/babel.config.js");
process.env.ESLINT_PATH_TSCONFIG = resolve("./tsconfig.eslint.json");

/** @type {import("eslint").Linter.Config} */
const baseEslintConfig = {
    extends: ["jacobfischer/react"],
};

module.exports = baseEslintConfig;
