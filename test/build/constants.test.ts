import { stat } from 'fs-extra';
import {
  DIST_DIR,
  DIST_PATH_CLIENT,
  DIST_PATH_CLIENT_BUNDLE,
  DIST_PATH_SERVER,
  LOADABLE_COMPONENTS_STATS_FILENAME,
  WEBPACK_BUNDLE_REPORT_FILENAME,
  inAbsRootDir,
} from '../../src/shared/build';

const stats = (...paths: string[]) => stat(inAbsRootDir(...paths));
const isDirectory = async (...paths: string[]) =>
  (await stats(...paths)).isDirectory();
const isFile = async (...paths: string[]) => (await stats(...paths)).isFile();

describe('Test the build constants and existence', () => {
  it('Should have a dist directory', async () => {
    expect(await isDirectory(DIST_DIR)).toBe(true);
  });

  it('Should have a client build', async () => {
    expect(await isDirectory(DIST_PATH_CLIENT)).toBe(true);
    expect(await isDirectory(DIST_PATH_CLIENT_BUNDLE)).toBe(true);
  });

  it('Should have a server build', async () => {
    expect(await isDirectory(DIST_PATH_SERVER)).toBe(true);
  });

  it('Should have bundled report file', async () => {
    expect(await isFile(DIST_DIR, WEBPACK_BUNDLE_REPORT_FILENAME)).toBe(true);
  });

  it('Should have loadable chunks file', async () => {
    expect(
      await isFile(DIST_PATH_CLIENT, LOADABLE_COMPONENTS_STATS_FILENAME),
    ).toBe(true);
  });
});
