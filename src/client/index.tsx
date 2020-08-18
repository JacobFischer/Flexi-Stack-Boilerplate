import { loadableReady } from "@loadable/component";
import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ROOT_ELEMENT_ID, SSR_TOKEN } from "../shared/build";
import { App } from "../shared/components/App";

const safeWindow = window as typeof window & Record<string, unknown>;
const ssr = safeWindow[SSR_TOKEN];

window.onload = async () => {
    let reactRender = render;
    if (ssr) {
        reactRender = hydrate;
        await loadableReady();
    }

    reactRender(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById(ROOT_ELEMENT_ID),
    );
};
