import { Server } from "http";
// import cors from "cors";
import express from "express";
import { DIST_PATH_CLIENT, STATIC_BUNDLE_DIR } from "../shared/build";
import { routeExists } from "../shared/routes";
import { getChunkStats } from "./get-chunk-stats";
import { render } from "./render";
import { rootDir } from "./root-dir";

/**
 * Starts a new http server listening for requests and responding to them.
 *
 * @param port - The port to bind to. Must be open.
 * @param enableClientSideRendering - If client side rendering will be enabled.
 * If true the client dist must already be built.
 * @returns A promise that resolves once the http server is up an listening,
 * resolving to that node server.
 */
export async function start(
    port: number,
    enableClientSideRendering: boolean,
): Promise<Server> {
    const app = express();
    // app.use(cors);

    app.use(
        "/static",
        express.static(rootDir(DIST_PATH_CLIENT, STATIC_BUNDLE_DIR)),
    );

    const chunkStats = await getChunkStats();
    app.get("*", (req, res) => {
        if (!routeExists(req.url)) {
            res.status(404);
        }

        return render(res, req.url, chunkStats, enableClientSideRendering);
    });

    return new Promise<Server>((res) => {
        const server = app.listen(port, () => res(server));
    });
}
