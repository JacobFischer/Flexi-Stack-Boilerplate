import { Server } from 'http';
// import cors from "cors";
import express from 'express';
import routes from './routes';
import { setupRoutes } from './utils/setup-routes';

/**
 * The options used to startup the server.
 *
 * @param port - The port to bind to. Must be open.
 * @param enableClientSideRendering - If client side rendering will be enabled.
 * If true the client dist must already be built.
 */
export interface ServerSetupOptions {
  port: number;
  enableClientSideRendering: boolean;
}

/**
 * Starts a new http server listening for requests and responding to them.
 *
 * @param options - Options to initialize the server with.
 * @returns A promise that resolves once the http server is up an listening,
 * resolving to that node server.
 */
export async function start(options: ServerSetupOptions): Promise<Server> {
  const app = express();
  // app.use(cors);

  await setupRoutes(app, options, routes);

  return new Promise<Server>((res) => {
    const server = app.listen(options.port, () => res(server));
  });
}
