import { describe, it, expect } from 'vitest';
import { checkOwnership, isLocalOrPrivate, capUsers } from '../src/guard/ownership.js';

describe('ownership guard', () => {
  it('allows local and private hosts without confirmation', () => {
    expect(checkOwnership('http://localhost:8080', false).ok).toBe(true);
    expect(checkOwnership('http://192.168.1.5', false).ok).toBe(true);
  });
  it('blocks remote hosts unless confirmed', () => {
    expect(checkOwnership('https://example.com', false).ok).toBe(false);
    expect(checkOwnership('https://example.com', true).ok).toBe(true);
  });
  it('rejects invalid or non-http URLs', () => {
    expect(checkOwnership('not a url', true).ok).toBe(false);
    expect(checkOwnership('ftp://example.com', true).ok).toBe(false);
  });
  it('private range edges', () => {
    expect(isLocalOrPrivate('172.20.0.1')).toBe(true);
    expect(isLocalOrPrivate('172.32.0.1')).toBe(false);
  });
  it('caps users', () => {
    expect(capUsers(99999)).toBe(5000);
    expect(capUsers(0)).toBe(1);
  });
});