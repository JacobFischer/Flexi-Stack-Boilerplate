import program from "commander";
import { start } from "./start";

void (async () => {
    // eslint-disable-next-line no-console
    console.log("--- Server Starting ---");

    program
        .version("0.0.1") // TODO: read from package.json with webpack happy
        .description("Starts the backend server.")
        .option("-p, --port <port>", "The port to bind to", 8080)
        .option("-c, --csr", "Enable client side rendering")
        .parse(process.argv);

    const opts = program.opts();
    const enableClientSideRendering = Boolean(opts.csr);
    const port = Number(opts.port);

    if (isNaN(port) || port < 0 || port > 65535) {
        // eslint-disable-next-line no-console
        console.error(`Error: Port out of range: '${String(opts.port)}'`);
        process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log(
        `» client side rendering: ${
            enableClientSideRendering ? "enabled" : "disabled"
        }`,
    );

    try {
        await start({ enableClientSideRendering, port });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error starting server:", err);
        process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log(`--- Server listening on port ${port} ---`);
})();
