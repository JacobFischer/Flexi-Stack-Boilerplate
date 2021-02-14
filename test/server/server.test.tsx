import { Server } from 'http';
import { Writable } from 'stream';
import puppeteer from 'puppeteer';
import { Browser } from 'puppeteer/lib/cjs/puppeteer/common/Browser';
import { getChunkStats, render } from '../../src/server/utils';
import { start } from '../../src/server/start';
import { matchingRoute } from '../../src/shared/app/routes';
import { SSR_TOKEN } from '../../src/shared/build';
import { closeServer, isPortTaken } from '../utils';

describe('Server', () =>
  [true, false].forEach((csr) =>
    describe(`with${csr ? '' : 'out'} client side rendering`, () => {
      const port = 8888 + Number(csr);
      const startOptions = { enableClientSideRendering: csr, port };

      it('has a port to bind to', async () => {
        expect(port).toBeGreaterThan(0);
        const portTaken = await isPortTaken(port);
        expect(portTaken).toBe(false);
      });

      it('starts and closes', async () => {
        const server = await start(startOptions);
        expect(server).toBeInstanceOf(Server);
        expect(server.listening).toBe(true);

        const portTakenConnected = await isPortTaken(port);
        expect(portTakenConnected).toBe(true);

        await closeServer(server);
        expect(server.listening).toBe(false);

        const portTakenDisconnected = await isPortTaken(port);
        expect(portTakenDisconnected).toBe(false);
      });

      describe('with puppeteer', () => {
        // will be set first below
        let browser = (undefined as unknown) as Browser;
        beforeAll(async () => {
          browser = await puppeteer.launch();
        });

        afterAll(async () => browser && browser.close());

        it('has a puppeteer browser', () => {
          expect(browser).toBeTruthy();
        });

        it(`ssr token is ${csr ? '' : 'not '}present`, async () => {
          const server = await start(startOptions);
          const location = '/';
          const page = await browser.newPage();
          await page.goto(`http://localhost:${port}${location}`);

          const evalSSR = await page.evaluate(`window.${SSR_TOKEN}`);
          expect(evalSSR).toStrictEqual(csr || undefined);

          await page.close();
          await closeServer(server);
        });

        // eslint-disable-next-line jest/no-done-callback
        it('serves the page', async (done) => {
          const server = await start(startOptions);
          const location = '/';
          const page = await browser.newPage();
          page.on('error', (err) => void done.fail(err));
          await page.setCacheEnabled(false);
          await page.setJavaScriptEnabled(false);

          const response = await page.goto(
            `http://localhost:${port}${location}`,
          );
          expect(response).toBeTruthy();
          expect(response && response.status()).toStrictEqual(200);

          const chunks = new Array<string>();
          const stream = new Writable({
            write: (chunk, _, next) => {
              chunks.push(String(chunk));
              next();
            },
          });

          await render(stream, location, await getChunkStats(), csr);

          // chop off the end, because scripts may exist
          const renderedHtml = chunks
            .join('')
            // React will render self closing tags, e.g. <img /> with the close tag. Webkit will omit the /, so we need to strip them.
            .replace(/\/>/g, '>')
            // special case, webkit won't allow tagless
            .replace(/async/g, `async=""`);

          const pageHtml = await page.content();
          expect(pageHtml).toEqual(renderedHtml);

          // expect at least 1 script tag with client side rendering,
          //  otherwise none
          expect(pageHtml.includes('<script')).toBe(csr);

          // now test with js to make sure it just renders
          await page.setJavaScriptEnabled(true);
          await page.reload();
          await page.waitForTimeout(1000);
          // if an error was thrown with js enabled the on error
          // callback at the start will fail this test

          await page.close();
          await closeServer(server);
          done();
        });

        // eslint-disable-next-line jest/no-done-callback
        it('serves 404 errors on not found routes', async (done) => {
          const route404 = '/i-should-not/work';
          expect(matchingRoute(route404)).toBe(false);

          const server = await start(startOptions);
          const page = await browser.newPage();
          page.on('error', (err) => void done.fail(err));

          const response = await page.goto(
            `http://localhost:${port}${route404}`,
          );
          expect(response).toBeTruthy();
          expect(response && response.status()).toStrictEqual(404);

          await page.close();
          await closeServer(server);
          done();
        });
      });
    }),
  ));
