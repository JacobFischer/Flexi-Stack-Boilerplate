import { Router, static as staticDir } from 'express';
import { rootDir } from '../utils/root-dir';
import { DIST_PATH_CLIENT_ASSETS, ASSETS_DIR } from '../../shared/build';

export default Router().use(
  `/${ASSETS_DIR}`,
  staticDir(rootDir(DIST_PATH_CLIENT_ASSETS)),
);
