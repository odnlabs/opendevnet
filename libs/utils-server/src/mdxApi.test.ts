import { expect, test } from 'vitest';
import { getSlugPosition, removePos } from './mdxApi';

test('gets slug position', () => {
  expect(getSlugPosition('01-foo-bar')).toEqual(1);
  expect(getSlugPosition('50-foo-bar')).toEqual(50);
  expect(() => getSlugPosition('00-foo-bar')).toThrowError();
  expect(() => getSlugPosition('01')).toThrowError();
  expect(() => getSlugPosition('-')).toThrowError();
  expect(() => getSlugPosition('foo-bar')).toThrowError();
  expect(() => getSlugPosition('-foo-bar')).toThrowError();
});

test('removes slug position', () => {
  expect(removePos('01-foo-bar')).toEqual('foo-bar');
  expect(removePos('50-foo-bar')).toEqual('foo-bar');
  expect(() => removePos('00-foo-bar')).toThrowError();
  expect(() => removePos('01')).toThrowError();
  expect(() => removePos('-')).toThrowError();
  expect(() => removePos('foo-bar')).toThrowError();
  expect(() => removePos('-foo-bar')).toThrowError();
});
