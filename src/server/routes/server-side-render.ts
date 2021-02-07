import { Router } from "express";
import StatusCodes from "http-status-codes";
import { getChunkStats, render } from "../utils";
import { matchingRoute } from "../../shared/app/routes";

export default async (opts: { enableClientSideRendering: boolean }) => {
    const chunkStats = await getChunkStats();
    const csr = Boolean(opts.enableClientSideRendering);

    return Router().get("*", (req, res) => {
        if (!matchingRoute(req.url)) {
            res.status(StatusCodes.NOT_FOUND);
        }

        void render(res, req.url, chunkStats, csr);
    });
};
