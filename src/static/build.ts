import { join } from "path";
import { createWriteStream, ensureDir, readdir, copyFile } from "fs-extra";
import { getChunkStats } from "../server/get-chunk-stats";
import { render } from "../server/render";
import { DIST_PATH_CLIENT, STATIC_BUNDLE_DIR } from "../shared/build";
import { routes } from "../shared/routes";

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
    const routesAnd404 = ["/404", ...routes.map(([route]) => route)];

    log(
        `Starting to build static pages for all ${routesAnd404.length} routes`,
    );

    const chunkStats = await getChunkStats();

    await Promise.all([
        ...routesAnd404.map(async (route) => {
            let pathDir = rootDir(route);
            let filename = "index.html";
            if (route === "/404") {
                pathDir = rootDir(); // we don't want the directory 404/,
                filename = "404.html"; // just the file 404.html
            }

            await ensureDir(pathDir);

            const pathFile = join(pathDir, filename);
            const fileStream = createWriteStream(pathFile);

            await render(fileStream, route, chunkStats, false);

            log(`  -> Route '${route}' saved to static file '${pathFile}'`);
        }),
        (async () => {
            const clientStaticPath = join(DIST_PATH_CLIENT, STATIC_BUNDLE_DIR);
            const outputStaticPath = join(outputPath, STATIC_BUNDLE_DIR);

            await ensureDir(outputStaticPath);

            const staticFilenames = await readdir(clientStaticPath);
            const cssFileNames = staticFilenames.filter((filename) =>
                filename.endsWith(".css"),
            );

            await Promise.all(
                cssFileNames.map((filename) =>
                    copyFile(
                        join(clientStaticPath, filename),
                        join(outputStaticPath, filename),
                    ),
                ),
            );

            log(`  -> Static css files copied to '${outputStaticPath}'`);
        })(),
    ]);
}
