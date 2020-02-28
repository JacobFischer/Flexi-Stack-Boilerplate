import { Server } from "http";
import { createServer } from "net";
import express from "express";

/**
 * Closes m http server created by React as a promise.
 *
 * @param server - The server to close.
 * @returns A promise that resolves once the server is closed.
 */
export const closeServer = (server: Server): Promise<void> =>
    new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

/**
 * Creates a new express server promise-ified.
 *
 * @param port - The port to bind the express server to.
 * @param withApp - Optional Express app HOC.
 * @returns A new express server.
 */
export async function newExpressServer(
    port: number,
    withApp?: (app: express.Application) => void | Promise<unknown>,
): Promise<Server> {
    const app = express();
    if (withApp) {
        await withApp(app);
    }
    return new Promise((resolve) => {
        const server = app.listen(port, () => resolve(server));
    });
}

export const isPortTaken = (port: number): Promise<boolean> =>
    new Promise((resolve, reject) => {
        const tester = createServer();
        tester.once("error", (err: Error & { code?: string }) => {
            if (err.code === "EADDRINUSE") {
                resolve(true); // address was in use, port is thus taken
            } else {
                reject(err); // unexpected other error occurred
            }
        });
        tester.once("listening", () => tester.close(() => resolve(false)));
        tester.listen(port);
    });
