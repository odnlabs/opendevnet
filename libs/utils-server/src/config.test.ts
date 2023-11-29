import { describe, expect, it } from 'vitest';
import config from './config';

describe('config', () => {
  it('has a name, avatar, and email', () => {
    expect(config.name).toEqual('Open Dev Net');
    expect(config.defaultAvatar).toMatch(/^\//);
    expect(config.social.email).toMatch(/^mailto:/);
  });

  it('has valid http URLs', () => {
    const urlRegex = /^(?:http|https):\/\//;
    expect(config.api).toMatch(urlRegex);
    expect(config.website).toMatch(urlRegex);
    expect(config.webClient).toMatch(urlRegex);
    expect(config.internalDocs).toMatch(urlRegex);
  });
});
