import urlJoin from 'url-join';
import { BUNDLE_DIR, GLOBALS_CSS_FILENAME } from './constants';

const globalCssPath = urlJoin(BUNDLE_DIR, GLOBALS_CSS_FILENAME);
const unIndent = (str: string) => str.replace(/ {4}|\n|\t/g, '');

/**
 * The parts of the index.html template split between the body for various
 * build scripts to maintain the same html skeleton.
 */
export const indexHtmlTemplate = Object.freeze({
  start: unIndent(`
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/${globalCssPath}" media="all">
`),
  endHeadStartBody: unIndent(`
    </head>
    <body>`),
  end: unIndent(`
    </body>
</html>`),
});
