import { Router } from "express";
import { getChunkStats, render } from "../utils";
import { routeExists } from "../../shared/routes";

export default async (opts: { enableClientSideRendering: boolean }) => {
    const chunkStats = await getChunkStats();
    return Router().get("*", (req, res) => {
        if (!routeExists(req.url)) {
            res.status(404);
        }

        const csr = Boolean(opts.enableClientSideRendering);
        return render(res, req.url, chunkStats, csr);
    });
};
