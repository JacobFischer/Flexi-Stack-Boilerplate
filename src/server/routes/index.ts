import staticRoute from './static';
import serverSideRender from './server-side-render';

export default {
  route: '/',
  handlers: [
    staticRoute, // try to handle as a static asset first, if not
    serverSideRender, // then do a server side render
  ],
};
