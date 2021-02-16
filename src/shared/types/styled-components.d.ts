import { Theme } from '../app/theme';

// from: https://github.com/styled-components/styled-components/issues/1589#issuecomment-456641381
// this will essentially override the DefaultTheme type to be our defined theme's shape.
// We will unit test to ensure this is correct;
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
