import { describe, expect, it } from 'vitest';
import { getSlugPosition, removePos, verifyFrontmatter } from './mdxApi';

describe('mdxApi', () => {
  it('gets slug position', () => {
    expect(getSlugPosition('01-foo-bar')).toEqual(1);
    expect(getSlugPosition('50-foo-bar')).toEqual(50);
    expect(() => getSlugPosition('00-foo-bar')).toThrowError();
    expect(() => getSlugPosition('01')).toThrowError();
    expect(() => getSlugPosition('-')).toThrowError();
    expect(() => getSlugPosition('foo-bar')).toThrowError();
    expect(() => getSlugPosition('-foo-bar')).toThrowError();
  });

  it('removes slug position', () => {
    expect(removePos('01-foo-bar')).toEqual('foo-bar');
    expect(removePos('50-foo-bar')).toEqual('foo-bar');
    expect(() => removePos('00-foo-bar')).toThrowError();
    expect(() => removePos('01')).toThrowError();
    expect(() => removePos('-')).toThrowError();
    expect(() => removePos('foo-bar')).toThrowError();
    expect(() => removePos('-foo-bar')).toThrowError();
  });

  it('validates frontmatter', () => {
    expect(() => {
      verifyFrontmatter(
        '/',
        {
          title: 'title',
        },
        [
          ['title', 'string'],
          ['position', 'number'],
        ]
      );
    }).toThrowError();

    expect(() => {
      verifyFrontmatter(
        '/',
        {
          description: 5,
        },
        [['description', 'string']]
      );
    }).toThrowError();
  });
});
