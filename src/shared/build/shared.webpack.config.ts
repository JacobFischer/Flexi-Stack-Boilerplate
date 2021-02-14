/* eslint-env node */
import { TransformOptions } from '@babel/core';
import urlJoin from 'url-join';
import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { ASSETS_DIR } from './constants';

export const createWebpackConfiguration = (
  babelConfig: TransformOptions,
  ...configs: Configuration[]
) => (env: unknown, argv: Configuration): Configuration =>
  webpackMerge(
    {
      devtool: argv.mode === 'development' ? 'eval-cheap-source-map' : false,
      entry: [],
      experiments: {
        asset: true,
      },
      module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: babelConfig,
              },
              {
                loader: 'ts-loader',
              },
            ],
          },
          {
            test: /\.(jpe?g|png|gif|ico|svg)$/i,
            type: 'asset',
          },
          {
            test: /\.css/i,
            type: 'asset/resource',
            use: [
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-import',
                      argv.mode === 'development' ? undefined : 'cssnano',
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
      output: {
        assetModuleFilename: urlJoin(ASSETS_DIR, '[name]-[hash][ext]'),
        publicPath: '/',
      },
      optimization: {
        sideEffects: true,
        splitChunks: {
          chunks: 'all',
        },
        usedExports: true,
      },
      resolve: {
        alias:
          argv.mode === 'development'
            ? { 'react-dom': '@hot-loader/react-dom' }
            : {},
        extensions: ['.tsx', '.ts', '.js'],
      },
    },
    ...configs,
  );
