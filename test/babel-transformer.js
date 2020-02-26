/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");
const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
    extends: resolve(__dirname, "../src/shared/build/babel.config.js"),
    plugins: ["@babel/plugin-transform-typescript"],
    presets: [
        ["@babel/preset-env", {
            shippedProposals: true,
            targets: {
                node: "current",
            },
        }],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
});
