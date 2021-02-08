import { Writable } from 'stream';
import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import {
  renderToNodeStream,
  renderToStaticNodeStream,
} from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import {
  indexHtmlTemplate,
  ROOT_ELEMENT_ID,
  SSR_TOKEN,
} from '../../shared/build';
import { Body, Head } from '../../shared/app';

const ssrScript = `<script>window.${SSR_TOKEN}=true;</script>`;

const streamedPromise = (output: Writable) => (
  stream: NodeJS.ReadableStream,
) =>
  new Promise((resolve, reject) => {
    stream.pipe(output, { end: false });
    stream.once('end', resolve);
    stream.once('error', reject);
  });

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
  output.write(indexHtmlTemplate.start);

  const renderToStream = enableClientSideRendering
    ? renderToNodeStream
    : renderToStaticNodeStream;

  const headStream = renderToStream(
    <StaticRouter location={location}>
      <Head />
    </StaticRouter>,
  );

  const stream = streamedPromise(output);
  await stream(headStream);

  output.write(indexHtmlTemplate.endHeadStartBody);

  const sheet = new ServerStyleSheet();
  const extractor = new ChunkExtractor({ stats: chunkStats });
  const jsxRaw = (
    <div id={ROOT_ELEMENT_ID}>
      <StaticRouter location={location}>
        <Body />
      </StaticRouter>
    </div>
  );
  const jsx = extractor.collectChunks(sheet.collectStyles(jsxRaw));
  // TODO: renderToStaticNodeStream for static renders
  const bodyStream = sheet.interleaveWithNodeStream(renderToStream(jsx));
  await stream(bodyStream);

  output.write(extractor.getStyleTags());

  /* istanbul ignore if: once again, chunks are never found during tests */
  if (enableClientSideRendering) {
    output.write(ssrScript);
    output.write(extractor.getScriptTags());
  }

  output.end(indexHtmlTemplate.end);
}
