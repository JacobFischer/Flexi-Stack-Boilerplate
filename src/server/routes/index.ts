import staticRoute from './static';
import ssr from './server-side-render';

export default { route: '/', handlers: [staticRoute, ssr] };
