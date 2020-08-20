/**
 * Un-indents text from 4 spaces, newlines, and tabs to nothing.
 *
 * @param str - The string to un-indent.
 * @returns The string without 4 spaces, newlines, or tabs.
 */
const unIndent = (str: string) => str.replace(/ {4}|\n|\t/g, "");

/**
 * The parts of the index.html template split between the body for various
 * build scripts to maintain the same html skeleton.
 */
export const indexHtmlTemplate = Object.freeze({
    top: unIndent(`
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Flexi-Stack</title>
    </head>
    <body>`),
    bottom: unIndent(`
    </body>
</html>
`),
});
