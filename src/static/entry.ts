/* istanbul ignore file */

import { DIST_PATH_STATIC_OUTPUT } from '../shared/build';
import { buildStaticPages } from './build';

/* eslint-disable no-console */
void (async () => {
  try {
    await buildStaticPages(DIST_PATH_STATIC_OUTPUT, console.log);
    console.log('-- Static website built --');
  } catch (err) {
    console.error('Error generating static pages!', err);
    process.exit(1);
  }
})();
