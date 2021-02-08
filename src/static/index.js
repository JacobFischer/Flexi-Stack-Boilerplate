// NOTE: This is JS, but we will manually setup Babel/TS.
// This is because babel is required for the @loadable/components to run in
// their transformed state. In addition, `babel-node` has open issues where it
// will not open our babel.config.js file. So this side steps it by
// using @babel/register directly.

const { resolve } = require('path');

// eslint-disable-next-line no-console
console.log('-- Static build --');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require('@babel/register')({
  extensions: ['.ts', '.tsx'],
  ignore: [],
  configFile: resolve(__dirname, './babel.config.js'),
});

require('./start.ts');
