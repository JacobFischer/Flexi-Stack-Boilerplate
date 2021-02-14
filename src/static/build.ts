import { join } from 'path';
import { createWriteStream, ensureDir } from 'fs-extra';
import { getChunkStats, render } from '../server/utils/';
import { pagesList } from '../shared/pages';

const silentLog: (...strings: string[]) => void = () => undefined;

/**
 * Builds all the static pages for a completely static html site.
 *
 * @param outputPath - The path to output html files and directories that makeup the static site to.
 * @param log - An optional log function to make this function verbose, such as `console.log`.
 * @returns A promise that resolves once the static pages are generated.
 */
export async function buildStaticPages(outputPath: string, log = silentLog) {
  const rootDir = (...paths: string[]) => join(outputPath, ...paths);
  const routesAnd404 = ['/404', ...pagesList.map(({ route }) => route)];

  log(`Starting to build static pages for all ${routesAnd404.length} routes`);

  const chunkStats = await getChunkStats();

  await Promise.all(
    routesAnd404.map(async (route) => {
      let pathDir = rootDir(route);
      let filename = 'index.html';
      if (route === '/404') {
        pathDir = rootDir(); // we don't want the directory 404/,
        filename = '404.html'; // just the file 404.html
      }

      await ensureDir(pathDir);

      const pathFile = join(pathDir, filename);
      const fileStream = createWriteStream(pathFile);

      await render(fileStream, route, chunkStats, false);

      log(`  -> Route '${route}' saved to static file '${pathFile}'`);
    }),
  );
}
