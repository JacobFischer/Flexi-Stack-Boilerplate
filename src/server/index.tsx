import { start } from "./start";

const port = 8080;
void (async () => {
    // eslint-disable-next-line no-console
    console.log("--- Server Starting ---");

    try {
        await start({ enableClientSideRendering: true, port });
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error starting server:", err);
        process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log(`--- Server listening on port ${port} ---`);
})();
