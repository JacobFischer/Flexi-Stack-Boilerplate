/* eslint-env node */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join, resolve } from 'path';
import { Configuration } from 'webpack';
import EventHooksPlugin from 'event-hooks-webpack-plugin';
import { unlinkSync } from 'fs';
import { DIST_PATH_CLIENT_BUNDLE, GLOBALS_CSS_FILENAME } from './constants';
import { inAbsRootDir } from './utils';

const jsOutputFilename = 'css-delete-me';
const outputDir = inAbsRootDir(DIST_PATH_CLIENT_BUNDLE);

const cssWebpackConfig: Configuration = {
  entry: ['css-reset-and-normalize', resolve(__dirname, '../app/globals.css')],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: { exportOnlyLocals: false },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: GLOBALS_CSS_FILENAME,
    }),
    new EventHooksPlugin({
      done: () => {
        // eslint-disable-next-line no-console
        unlinkSync(join(outputDir, jsOutputFilename));
      },
    }),
  ],
  output: {
    filename: jsOutputFilename,
    path: outputDir,
  },
};

export default cssWebpackConfig;
