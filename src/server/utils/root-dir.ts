import { resolve, join } from 'path';

const root = resolve('./');

/**
 * Resolves some path(s) to the root directory.
 *
 * @param paths - Variadic args to append to the path.
 * @returns A string of the absolute path at the root.
 */
export const rootDir = (...paths: string[]) => join(root, ...paths);
