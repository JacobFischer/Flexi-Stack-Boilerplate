import { join } from 'path';

export const STATIC_BUNDLE_DIR = 'static/';
export const ROOT_ELEMENT_ID = 'site-root';
export const SSR_TOKEN = '__ssr';

export const DIST_DIR = 'dist/';
export const DIST_PATH_CLIENT = join(DIST_DIR, 'client/');
export const DIST_PATH_SERVER = join(DIST_DIR, 'server/');
export const DIST_PATH_STATIC = join(DIST_DIR, 'static/');

export const LOADABLE_COMPONENTS_STATS_FILENAME = 'loadables-stats.json';
