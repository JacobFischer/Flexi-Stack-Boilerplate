/* @ts-check */
/* eslint-env node */

const { resolve } = require("path");

/** @type {import("@babel/core").TransformOptions} */
const clientBabelConfig = {
    extends: resolve(__dirname, "../shared/build/babel.config.js"),
    plugins: [
        "@loadable/babel-plugin",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-catch-binding",
        ["@babel/plugin-transform-runtime", { regenerator: true }],
    ],
    presets: [
        ["@babel/preset-env", { shippedProposals: true }],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
};

module.exports = clientBabelConfig;
