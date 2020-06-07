// @ts-check
/* eslint-env node */
/* eslint-disable jsdoc/valid-types */

/*
const { dirname, join, resolve } = require("path");
const browserTsconfigPath = resolve(join(__dirname, "tsconfig.eslint.json"));
*/

/** @type {typeof import("../../.eslintrc.js")} */
const clientEslintConfig = {
    extends: ["jacobfischer/browser", "../../.eslintrc.js"],
    /*
    parserOptions: {
        project: browserTsconfigPath,
    },
    settings: {
        "import/resolver": {
            typescript: {
                directory: dirname(browserTsconfigPath),
            },
        },
    },
    */
};

module.exports = clientEslintConfig;
