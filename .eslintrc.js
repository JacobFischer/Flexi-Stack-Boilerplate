// @ts-check
/* eslint-env node */

const { resolve } = require("path");

process.env.ESLINT_PATH_BABELCONFIG = resolve("./src/client/babel.config.js");
process.env.ESLINT_PATH_TSCONFIG = resolve("./tsconfig.json");

/** @type {import("eslint").Linter.Config} */
const baseEslintConfig = {
    extends: ["jacobfischer/react"],
};

module.exports = baseEslintConfig;
