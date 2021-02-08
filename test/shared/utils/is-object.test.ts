import { isObject } from '../../../src/shared/utils';

class TestClass {
  // pass
}

describe('isObject', () => {
  it('should be a function', () => {
    expect(typeof isObject).toBe('function');
  });

  it('be callable', () => {
    expect(() => isObject({})).not.toThrow();
  });

  it('should return true for objects', () => {
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#examples
    [
      {},
      { a: 1 },
      [],
      [1, 2, 4],
      new TestClass(),
      new Date(),
      /regex/,
      new Boolean(true), // boolean wrapped in Boolean class
    ].forEach((obj) => expect(isObject(obj)).toBe(true));
  });

  it('should return false for not objects', () => {
    [
      null,
      1337,
      () => undefined,
      1234n,
      undefined,
      'str',
      NaN,
      Symbol('testing'),
    ].forEach((val) => expect(isObject(val)).toBe(false));
  });
});
