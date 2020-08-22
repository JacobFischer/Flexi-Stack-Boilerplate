import { IRouter, Router } from "express";

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

export type RouteExport =
    | IRouter
    | { route: string; handlers: RouteExport[] }
    | ((options: ServerSetupOptions) => RouteExport)
    | ((options: ServerSetupOptions) => Promise<RouteExport>);

const isRouter = (thing: RouteExport): thing is IRouter => "use" in thing;

/**
 * Sets up route handlers via some options.
 *
 * @param app - The parent app to use.
 * @param options - Options during setup.
 * @param route - The route export(s) to handle.
 */
export async function setupRoutes(
    app: IRouter,
    options: ServerSetupOptions,
    route: RouteExport,
): Promise<void> {
    if (isRouter(route)) {
        app.use(route);
    } else if (typeof route === "object") {
        const subRouter = Router();
        app.use(route.route, subRouter);

        for (const handler of route.handlers) {
            await setupRoutes(subRouter, options, handler);
        }
    } else {
        await setupRoutes(app, options, await route(options));
    }
}
