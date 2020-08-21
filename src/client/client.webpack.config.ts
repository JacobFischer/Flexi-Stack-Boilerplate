/* eslint-env node */
import { resolve } from "path";
import urlJoin from "url-join";
import LoadablePlugin from "@loadable/webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import {
    LOADABLE_COMPONENTS_STATS_FILENAME,
    ROOT_ELEMENT_ID,
    STATIC_BUNDLE_DIR,
    createWebpackConfiguration,
    indexHtmlTemplate,
} from "../shared/build";
import babelConfig from "./babel.config";

const inStaticDir = (...dirs: string[]) => urlJoin(STATIC_BUNDLE_DIR, ...dirs);

export default createWebpackConfiguration(babelConfig, {
    entry: ["css-reset-and-normalize", resolve(__dirname, "./index.tsx")],
    output: {
        filename: inStaticDir("[name].js"),
        path: resolve(__dirname, "../../dist/client"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: inStaticDir("[name].css"),
            chunkFilename: inStaticDir("[id].css"),
        }),
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
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: resolve(
                __dirname,
                "../../dist/webpack-bundle-report.html",
            ),
        }),
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
});
