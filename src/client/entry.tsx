const start = () => import("./start");

// no async/await syntax as we can't guarantee Promise support at this point
window.onload = () => {
    if (!window.Promise || !window.fetch || !window.Symbol) {
        // need to polyfill
        if (!window.Promise) {
            // webpack dynamic imports use Promises, so we have to polyfill
            // at least that before continuing
            /* eslint-disable @typescript-eslint/no-require-imports */
            require("core-js/modules/es.array.iterator");
            require("core-js/modules/es.promise");
            // require("core-js/modules/es.symbol");
            /* eslint-enable @typescript-eslint/no-require-imports */
        }

        void import("core-js").then(start);
    } else {
        void start();
    }
};
