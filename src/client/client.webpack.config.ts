/* eslint-env node */
import { resolve } from 'path';
import urlJoin from 'url-join';
import LoadablePlugin from '@loadable/webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {
  BUNDLE_DIR,
  DIST_PATH_CLIENT,
  DIST_DIR,
  LOADABLE_COMPONENTS_STATS_FILENAME,
  ROOT_ELEMENT_ID,
  WEBPACK_BUNDLE_REPORT_FILENAME,
  createWebpackConfiguration,
  inAbsRootDir,
  indexHtmlTemplate,
} from '../shared/build';
import { isObject, isKeyIn } from '../shared/utils';
import babelConfig from './babel.config';

const inBundleDir = (...dirs: string[]) => urlJoin(BUNDLE_DIR, ...dirs);

/**
 * LoadablePlugin's types are broken.
 * This inspects the shape to ensure it is the correct shape Webpack expects
 * to appease TypeScript.
 * This entire function should be removed once loadable component's types are
 * updated in DefinitelyTyped.
 *
 * @param args - The arguments to pass to the Loadable constructor directly.
 * @returns A new LoadablePlugin.
 */
const newLoadablePlugin = (
  ...args: ConstructorParameters<typeof LoadablePlugin>
): WebpackPluginInstance => {
  const thing: unknown = new LoadablePlugin(...args);

  if (isObject(thing) && isKeyIn(thing, 'apply', 'function')) {
    return thing;
  }

  throw new Error(`LoadablePlugin is not the expected shape!
Invalid to use in Webpack`);
};

export default createWebpackConfiguration(babelConfig, {
  entry: resolve(__dirname, './entry.tsx'),
  output: {
    filename: inBundleDir('[name].js'),
    path: inAbsRootDir(DIST_PATH_CLIENT),
    publicPath: '', // TODO: get "auto" to work as per Webpack v5
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: inBundleDir('[name].css'),
      chunkFilename: inBundleDir('[id].css'),
    }),
    newLoadablePlugin({
      filename: LOADABLE_COMPONENTS_STATS_FILENAME,
    }),
    new HtmlWebpackPlugin({
      templateContent: [
        indexHtmlTemplate.start,
        indexHtmlTemplate.endHeadStartBody,
        `<div id="${ROOT_ELEMENT_ID}"></div>`,
        indexHtmlTemplate.end,
      ].join(''),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: inAbsRootDir(DIST_DIR, WEBPACK_BUNDLE_REPORT_FILENAME),
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
});
