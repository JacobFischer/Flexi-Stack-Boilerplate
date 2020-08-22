import { Router, static as staticDir } from "express";
import { rootDir } from "../utils/root-dir";
import { DIST_PATH_CLIENT, STATIC_BUNDLE_DIR } from "../../shared/build";

export default Router().use(
    "/static",
    staticDir(rootDir(DIST_PATH_CLIENT, STATIC_BUNDLE_DIR)),
);
