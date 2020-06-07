import { Server } from "http";
import { resolve } from "path";
// import cors from "cors";
import express from "express";
import { readFile } from "fs-extra";
import {
    DIST_PATH_CLIENT,
    LOADABLE_COMPONENTS_STATS_FILENAME,
    STATIC_BUNDLE_DIR,
} from "../shared/build";
import { routeExists } from "../shared/routes";
import { render } from "./render";

/**
 * Resolves some path(s) to the root directory.
 *
 * @param paths - Variadic args to append to the path.
 * @returns A string of the absolute path at the root.
 */
const rootDir = (...paths: string[]) => resolve(__dirname, "../../", ...paths);

/**
 * Gets the main scripts from a client dist.
 *
 * @returns A promise that resolves to the <script src="index.js" /> and what-not in the client dist.
 */
export async function getLoadableComponentsStats() {
    const statsFile = await readFile(
        rootDir(DIST_PATH_CLIENT, LOADABLE_COMPONENTS_STATS_FILENAME),
    );
    const obj = JSON.parse(statsFile.toString()) as unknown;
    /* istanbul ignore else */
    if (obj !== null && typeof obj === "object") {
        return obj as Record<string, unknown>;
    } else {
        throw new Error(
            `Loadable component stats file parsed to unknown shape ${String(
                obj,
            )}`,
        );
    }
}

/**
 * Starts a new http server listening for requests and responding to them.
 *
 * @param port - The port to bind to. Must be open.
 * @param clientSideRendering - If client side rendering should be enabled.
 * If true the client dist must already be built.
 * @returns A promise that resolves once the http server is up an listening,
 * resolving to that node server.
 */
export async function start(
    port: number,
    clientSideRendering: boolean,
): Promise<Server> {
    const app = express();
    // app.use(cors);

    if (clientSideRendering) {
        app.use(
            "/static",
            express.static(rootDir(DIST_PATH_CLIENT, STATIC_BUNDLE_DIR)),
        );
    }

    const csrStats = clientSideRendering
        ? await getLoadableComponentsStats()
        : undefined;

    app.get("*", (req, res) => {
        if (!routeExists(req.url)) {
            res.status(404);
        }

        return render(res, req.url, csrStats);
    });

    return new Promise<Server>((res) => {
        const server = app.listen(port, () => res(server));
    });
}
