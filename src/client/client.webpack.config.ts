/* eslint-env node */
import { join, resolve } from "path";
import LoadablePlugin from "@loadable/webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {
    LOADABLE_COMPONENTS_STATS_FILENAME,
    ROOT_ELEMENT_ID,
    STATIC_BUNDLE_DIR,
    createWebpackConfiguration,
    indexHtmlTemplate,
} from "../shared/build";
import babelConfig from "./babel.config";

export default createWebpackConfiguration(babelConfig, {
    entry: ["core-js", resolve(__dirname, "./index.tsx")],
    output: {
        filename: join(STATIC_BUNDLE_DIR, "[name].js"),
        path: resolve(__dirname, "../../dist/client"),
    },
    plugins: [
        new LoadablePlugin({
            filename: LOADABLE_COMPONENTS_STATS_FILENAME,
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
