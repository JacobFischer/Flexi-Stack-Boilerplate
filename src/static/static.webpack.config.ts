import { existsSync, moveSync, rmSync } from 'fs-extra';
import { resolve } from 'path';
import webpack from 'webpack';
import { extendServerConfig } from '../server/server.webpack.config';
import {
  DIST_PATH_STATIC,
  STATIC_OUTPUT_DIR,
  ASSETS_DIR,
  inAbsRootDir,
} from '../shared/build';

const staticDirPath = (...paths: string[]) =>
  inAbsRootDir(DIST_PATH_STATIC, ...paths);

class MoveAssetsPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterEmit.tap('MoveAssetsPlugin', () => {
      const copyTo = staticDirPath(STATIC_OUTPUT_DIR, ASSETS_DIR);
      if (existsSync(copyTo)) {
        rmSync(copyTo, { recursive: true, force: true });
      }
      moveSync(staticDirPath(ASSETS_DIR), copyTo);
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
