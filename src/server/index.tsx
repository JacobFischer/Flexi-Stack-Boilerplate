import { start } from "./start";

const PORT = 8080;
void (async () => {
    // eslint-disable-next-line no-console
    console.log("--- Server Starting ---");

    try {
        await start(PORT, true);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error starting server:", err);
        process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.log(`--- Server listening on port ${PORT} ---`);
})();
