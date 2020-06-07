/* @ts-check */
/* eslint-env node */

const { resolve } = require("path");

/** @type {import("@babel/core").TransformOptions} */
const serverBabelConfig = {
    extends: resolve(__dirname, "../shared/build/babel.config.js"),
};

module.exports = serverBabelConfig;
