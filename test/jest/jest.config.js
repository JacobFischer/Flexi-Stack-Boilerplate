// @ts-check

const { resolve } = require('path');
const { accessSync } = require('fs');

const pathTo = (/** @type {string[]} */ ...paths) =>
  resolve(__dirname, ...paths);

try {
  accessSync(pathTo('../../dist'));
} catch (err) {
  throw new Error(`Jest config error
---
Cannot run Jest without dist built!
please run 'npm run build' first
---`);
}

/** @type {Partial<import("@jest/types/build/Config").InitialOptions>} */
const jestConfig = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\', // do not test external modules
    '(babel|webpack|jest).config.(j|t)s', // config files for frameworks/tools
    '.eslintrc.js', // config file for eslint
    // files for client/server entry-points. In truth they are tested, but these files are really primarily an entry for webpack running
    'src/(server|static)/(entry).(j|t)s(x?)',
    'src/client/', // client specific files are tested, but webpack bundled. Thus not coverage testable
  ],
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 0,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  rootDir: pathTo('../../'),
  setupFiles: [pathTo('./setup.ts')],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/(jest|utils)', // TODO: should really be tested...
    '([^s]+).config.(js|ts|tsx)',
    '.eslintrc.js(on)?',
  ],
  testRegex: ['(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'],
  testTimeout: 15_000,
  transform: {
    '^.+\\.[t|j]sx?$': pathTo('./transformers/babel.js'),
    '\\.(css|jpg|jpeg|png|gif|svg)$': pathTo('./transformers/asset.js'),
  },
  verbose: true,
};

module.exports = jestConfig;
