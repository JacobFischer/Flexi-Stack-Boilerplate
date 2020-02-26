/* eslint-env node */
import { join, resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {
    ROOT_ELEMENT_ID, STATIC_BUNDLE_DIR, createWebpackConfiguration, indexHtmlTemplate,
} from "../shared/build";
import babelConfig from "./babel.config";

const { StatsWriterPlugin } = require("webpack-stats-plugin");

export default createWebpackConfiguration(babelConfig, {
    stats: true,
    entry: [
        "core-js",
        resolve(__dirname, "./index.tsx"),
    ],
    output: {
        filename: join(STATIC_BUNDLE_DIR, "[name].js"),
        path: resolve(__dirname, "../../dist/client"),
    },
    plugins: [
        new StatsWriterPlugin({
            filename: "stats.json", // Default
        }),
        new HtmlWebpackPlugin({
            templateContent: [
                indexHtmlTemplate.top,
                `<div id="${ROOT_ELEMENT_ID}"></div>`,
                indexHtmlTemplate.bottom,
            ].join(""),
        }),
    ],
});
