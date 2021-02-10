import { indexHtmlTemplate } from '../../src/shared/build/template';

describe('indexHtmlTemplate template', () => {
  it('Should have template parts', () => {
    expect(typeof indexHtmlTemplate).toBe('object');
  });

  const htmlTemplate = [
    indexHtmlTemplate.start,
    indexHtmlTemplate.endHeadStartBody,
    indexHtmlTemplate.end,
  ].join('');

  for (const [part, value] of Object.entries(indexHtmlTemplate)) {
    it(`${part} should be a string`, () => {
      expect(value).toBeTruthy();
      expect(typeof value).toBe('string');
    });
  }

  for (const htmlTag of [
    '<!DOCTYPE html>',
    '<html',
    '</html>',
    '<head',
    '</head>',
    '<body',
    '</body>',
  ]) {
    it(`the HTML Tag ${htmlTag} should be in the template`, () => {
      expect(htmlTemplate).toContain(htmlTag);
    });
  }
});
