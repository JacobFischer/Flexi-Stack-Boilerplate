import { readFile } from 'fs-extra';
import { rootDir } from './root-dir';
import {
  DIST_PATH_CLIENT,
  LOADABLE_COMPONENTS_STATS_FILENAME,
} from '../../shared/build';

/**
 * Gets the webpack chunks stats for the server to determine loaded chunks.
 *
 * **Note**: This requires the client to have already been built.
 *
 * @returns A promise that resolves to the parsed chunks webpack already built.
 */
export async function getChunkStats() {
  const statsFile = await readFile(
    rootDir(DIST_PATH_CLIENT, LOADABLE_COMPONENTS_STATS_FILENAME),
  );
  const obj = JSON.parse(statsFile.toString()) as unknown;
  /* istanbul ignore else */
  if (typeof obj === 'object' && obj !== null) {
    return obj as Record<string, unknown>;
  } else {
    throw new Error(
      `Loadable component stats file parsed to unknown shape ${String(obj)}`,
    );
  }
}
