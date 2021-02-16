import { theme, Theme } from '../../../src/shared/app/theme';

describe('app theme', () => {
  it('exists', () => {
    expect(typeof theme).toBe('object');
    expect(theme).not.toBe(null);
  });

  it('is the correct type', () => {
    const anotherTheme: Theme = {
      primary: 'red',
      secondary: 'blue',
    };

    expect(Object.keys(theme)).toMatchObject(
      expect.arrayContaining(Object.keys(anotherTheme)),
    );

    expect(theme).toEqual(
      expect.objectContaining<
        Record<keyof Theme, ReturnType<typeof expect.any>>
      >({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        primary: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        secondary: expect.any(String),
      }),
    );
  });
});
