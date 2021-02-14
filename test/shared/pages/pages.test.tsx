import React from 'react';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import { pagesAnd404List } from '../../../src/shared/pages';
import { Body, Head } from '../../../src/shared/app';

describe('all pages', () => {
  pagesAnd404List.forEach((page) => {
    const { title, route, Component } = page;

    const render = (element: React.ReactElement) =>
      renderer.create(<StaticRouter location={route}>{element}</StaticRouter>);

    describe(`page '${title}'`, () => {
      it('should be the correct export shape', () => {
        expect(typeof page).toBe('object');
        expect(typeof Component).toBe('function');
        expect(typeof route).toBe('string');
        expect(typeof title).toBe('string');
      });

      it('renders', () => {
        expect(() => render(<Component />)).not.toThrow();
      });

      it('exists within the App', () => {
        const { root } = render(
          <html>
            <head>
              <Head />
            </head>
            <body>
              <Body />
            </body>
          </html>,
        );
        expect(root.findByType('title').children).toMatchObject([title]);
        expect(root.findAllByType(Component).length).toBe(1);
      });

      it('should match the last snapshot', () => {
        expect(render(<Component />).toJSON()).toMatchSnapshot();
      });
    });
  });
});
