import { join, resolve } from 'path';
import { inAbsRootDir } from '../../src/shared/build';

const ourAbsRoot = resolve(__dirname, '../../');

describe('Build utils functions', () => {
  describe('inAbsRootDir', () => {
    it('should exist', () => {
      expect(typeof inAbsRootDir).toBe('function');
    });

    it('should return a string', () => {
      expect(typeof inAbsRootDir()).toBe('string');
    });

    it('should work', () => {
      expect(inAbsRootDir()).toBe(ourAbsRoot);
      expect(inAbsRootDir('foo', 'bar')).toBe(join(ourAbsRoot, 'foo', 'bar'));

      expect(inAbsRootDir('test')).not.toBe('test');
    });
  });
});
