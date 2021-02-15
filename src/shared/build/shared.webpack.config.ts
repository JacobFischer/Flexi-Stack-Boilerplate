/* eslint-env node */
import { TransformOptions } from '@babel/core';
import urlJoin from 'url-join';
import { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import { ASSETS_DIR } from './constants';

export const createWebpackConfiguration = (
  babelConfig: TransformOptions,
  ...configs: Configuration[]
) => (env: unknown, argv: Configuration): Configuration => {
  const isDev = argv.mode === 'development';

  return webpackMerge(
    {
      devtool: isDev ? 'eval-cheap-source-map' : false,
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
            use: isDev ? undefined : ['image-webpack-loader'],
          },
          {
            test: /\.css/i,
            type: 'asset/resource',
            use: [
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['postcss-import', isDev ? undefined : 'cssnano'],
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
        alias: isDev ? { 'react-dom': '@hot-loader/react-dom' } : {},
        extensions: ['.tsx', '.ts', '.js'],
      },
    },
    ...configs,
  );
};
