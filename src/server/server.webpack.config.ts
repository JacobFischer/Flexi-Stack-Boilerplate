/* eslint-env node */
import { parse, resolve } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import {
  DIST_PATH_SERVER,
  createWebpackConfiguration,
  inAbsRootDir,
} from '../shared/build';
import babelConfig from './babel.config';

/**
 * This is a simple plugin to filter only js assets to be omitted.
 * All other assets and bundled files built by webpack live in the client dir.'.
 */
class OmitAssetsPlugin {
  apply(compiler: webpack.Compiler) {
    // Specify the event hook to attach to
    compiler.hooks.make.tap('OmitAssetsPlugin', (compilation) => {
      compilation.hooks.processAssets.tap('OmitAssetsPlugin', (assets) => {
        for (const key of Object.keys(assets)) {
          if (parse(key).ext !== '.js') {
            delete assets[key];
          }
        }
      });
    });
  }
}

const baseConfig: webpack.Configuration = {
  entry: [resolve(__dirname, './entry.tsx')],
  // we don't want to bundle node_modules (external modules)
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: inAbsRootDir(DIST_PATH_SERVER),
  },
  target: 'node',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

export const extendServerConfig = (...configs: webpack.Configuration[]) =>
  createWebpackConfiguration(babelConfig, baseConfig, ...configs);

export default extendServerConfig({
  plugins: [new OmitAssetsPlugin()],
});
