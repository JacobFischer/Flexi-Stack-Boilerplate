import { join } from 'path';

export const ROOT_ELEMENT_ID = 'site-root';
export const SSR_TOKEN = '__ssr';

export const DIST_DIR = 'dist/';
export const BUNDLE_DIR = 'bundle/';
export const DIST_PATH_CLIENT = join(DIST_DIR, 'client/');
export const DIST_PATH_CLIENT_BUNDLE = join(DIST_PATH_CLIENT, BUNDLE_DIR);
export const DIST_PATH_SERVER = join(DIST_DIR, 'server/');
export const DIST_PATH_STATIC = join(DIST_DIR, 'static/');

export const GLOBALS_CSS_FILENAME = 'globals.css';
export const WEBPACK_BUNDLE_REPORT_FILENAME = 'webpack-bundle-report.html';
export const LOADABLE_COMPONENTS_STATS_FILENAME = 'loadables-stats.json';
