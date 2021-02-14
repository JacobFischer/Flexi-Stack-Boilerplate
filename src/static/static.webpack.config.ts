import { resolve } from 'path';
import webpack from 'webpack';
import { extendServerConfig } from '../server/server.webpack.config';
import {
  DIST_PATH_STATIC,
  STATIC_OUTPUT_DIR,
  ASSETS_DIR,
  inAbsRootDir,
} from '../shared/build';

import { moveSync } from 'fs-extra';

const staticDirPath = (...paths: string[]) =>
  inAbsRootDir(DIST_PATH_STATIC, ...paths);

/**
 * This is a simple plugin to filter only js assets to be omitted.
 * All other assets and bundled files built by webpack live in the client dir.'.
 */
class MoveAssetsPlugin {
  apply(compiler: webpack.Compiler) {
    // Specify the event hook to attach to
    compiler.hooks.afterEmit.tap('MoveAssetsPlugin', () => {
      moveSync(
        staticDirPath(ASSETS_DIR),
        staticDirPath(STATIC_OUTPUT_DIR, ASSETS_DIR),
      );
    });
  }
}

export default extendServerConfig({
  entry: resolve(__dirname, './entry.ts'),
  output: {
    filename: 'build.js',
    path: staticDirPath(),
  },
  plugins: [new MoveAssetsPlugin()],
});
