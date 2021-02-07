import { loadableReady } from "@loadable/component";
import React from "react";
import { hydrate, render } from "react-dom";
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import { ROOT_ELEMENT_ID, SSR_TOKEN } from "../shared/build";
import { Body, Head } from "../shared/app";

const safeWindow = window as typeof window & Record<string, unknown>;
const ssr = safeWindow[SSR_TOKEN];

void (async () => {
    let reactRender = render;
    if (ssr) {
        reactRender = hydrate;
        await loadableReady();
    }

    reactRender(
        <BrowserRouter>
            <Head Wrapper={Helmet} />
            <Body />
        </BrowserRouter>,
        document.getElementById(ROOT_ELEMENT_ID),
    );
})();
