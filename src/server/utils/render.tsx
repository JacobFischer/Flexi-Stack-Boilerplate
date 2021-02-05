import { Writable } from "stream";
import { ChunkExtractor } from "@loadable/server";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter, StaticRouterContext } from "react-router";
import { ServerStyleSheet } from "styled-components";
import {
    indexHtmlTemplate,
    ROOT_ELEMENT_ID,
    SSR_TOKEN,
} from "../../shared/build";
import { App } from "../../shared/components/App";

const ssrScript = `<script>window.${SSR_TOKEN}=true;</script>`;

/**
 * Renders the React app in a node (server) environment.
 *
 * @param output - The write stream to stream the html to as it is built.
 * @param location - The location to render in the app.
 * @param chunkStats - Loadable components chuck stats to use during rendering.
 * @param enableClientSideRendering - Flag if clients should resume rendering.
 * If set to false <script> tags are not send in the response, so the page is
 * only HTML + CSS. No client side logic.
 * @returns A promise that resolves once the entire html document has been
 * written to `output`.
 */
export async function render(
    output: Writable,
    location: string,
    chunkStats: Record<string, unknown>,
    enableClientSideRendering: boolean,
) {
    output.write(indexHtmlTemplate.top);

    const sheet = new ServerStyleSheet();
    // normally we"d use a StaticRouter context to capture if the rendered route
    // was a 404 not found; however we are streaming this response.
    // So the HTTP Status Code has already been sent,
    // thus we don"t care at this point in time.
    const staticRouterContext: StaticRouterContext = {};

    const extractor = new ChunkExtractor({ stats: chunkStats });
    const jsxElement = (
        <div id={ROOT_ELEMENT_ID}>
            <StaticRouter location={location} context={staticRouterContext}>
                <App />
            </StaticRouter>
        </div>
    );

    const jsx = extractor.collectChunks(sheet.collectStyles(jsxElement));
    // TODO: renderToStaticNodeStream for static renders
    const bodyStream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
    bodyStream.pipe(output, { end: false });
    await new Promise((resolve) => bodyStream.once("end", resolve));

    output.write(extractor.getStyleTags());

    /* istanbul ignore if: once again, chunks are never found during tests */
    if (enableClientSideRendering) {
        output.write(ssrScript);
        output.write(extractor.getScriptTags());
    }

    output.end(indexHtmlTemplate.bottom);
}
