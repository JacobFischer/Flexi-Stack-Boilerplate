/* eslint-env node */
import { resolve } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { DIST_PATH_SERVER, createWebpackConfiguration } from '../shared/build';
import babelConfig from './babel.config';

const distRoot = (...paths: string[]) =>
  resolve(__dirname, '../../', ...paths);

export default createWebpackConfiguration(babelConfig, {
  entry: [resolve(__dirname, './entry.tsx')],
  // we don't want to bundle node_modules (external modules)
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: distRoot(DIST_PATH_SERVER),
  },
  target: 'node',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
