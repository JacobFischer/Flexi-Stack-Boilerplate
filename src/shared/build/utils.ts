import { resolve } from 'path';

/**
 * Formats a path into an absolute path as the root of this project
 * (where package.json lives).
 *
 * @param paths - The directory(s) to append.
 * @returns The path as an absolute path starting from the root.
 */
export function inAbsRootDir(...paths: string[]) {
  return resolve(__dirname, '../../../', ...paths);
}
