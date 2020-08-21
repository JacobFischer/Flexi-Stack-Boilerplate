import { resolve } from "path";

/**
 * Resolves some path(s) to the root directory.
 *
 * @param paths - Variadic args to append to the path.
 * @returns A string of the absolute path at the root.
 */
export const rootDir = (...paths: string[]) =>
    resolve(__dirname, "../../", ...paths);
