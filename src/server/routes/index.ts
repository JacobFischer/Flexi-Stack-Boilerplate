import assets from './assets';
import bundle from './bundle';
import serverSideRender from './server-side-render';

export default {
  route: '/',
  handlers: [
    assets,
    bundle, // try to handle as a static assets and bundles first
    serverSideRender, // if not then do a server side render
  ],
};
