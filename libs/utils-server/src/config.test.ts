import { describe, expect, it } from 'vitest';
import config from './config';

describe('config', () => {
  it('has a name, avatar, and email', () => {
    expect(config.name).toEqual('Open Dev Net');
    expect(config.defaultAvatar).toMatch(/^\//);
    expect(config.social.email).toMatch(/^mailto:/);
  });

  it('has valid http URLs', () => {
    const urlRegex =
      '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    const url = new RegExp(urlRegex, 'i');
    expect(config.api).toMatch(url);
    expect(config.website).toMatch(url);
    expect(config.webApp).toMatch(url);
    expect(config.internalDocs).toMatch(url);
  });
});
