import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { vi, describe, it, beforeEach, afterEach, afterAll, expect } from 'vitest';

import handler from '../../../docs/pages/api/sign-cloudinary-params';

// next-cloudinary doesn't depend on the Cloudinary Node SDK, the docs app does,
// so load the same copy the endpoint uses.
const docsRequire = createRequire(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../docs/package.json')
);
const { v2: cloudinary } = docsRequire('cloudinary');

const SECRET = 'test-secret';
const PRESET = 'next-cloudinary-signed';
const NOW_MS = Date.UTC(2026, 10, 27, 12, 0, 0);
const NOW = NOW_MS / 1000;

function call(body) {
  const res = {
    statusCode: undefined,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return handler({ body }, res).then(() => res);
}

function upload(overrides = {}) {
  return { timestamp: NOW, source: 'uw', upload_preset: PRESET, ...overrides };
}

describe('docs/pages/api/sign-cloudinary-params', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, CLOUDINARY_API_SECRET: SECRET };
    vi.useFakeTimers();
    vi.setSystemTime(NOW_MS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('signs upload requests', () => {
    it('returns the SDK signature for the parameters the widget sends', async () => {
      const paramsToSign = upload();
      const res = await call({ paramsToSign });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        signature: cloudinary.utils.api_sign_request(paramsToSign, SECRET),
      });
    });

    it('accepts a timestamp exactly at the edge of the window, in both directions', async () => {
      expect((await call({ paramsToSign: upload({ timestamp: NOW + 300 }) })).statusCode).toBe(200);
      expect((await call({ paramsToSign: upload({ timestamp: NOW - 300 }) })).statusCode).toBe(200);
    });
  });

  describe('rejects parameters that are not an upload', () => {
    it.each([
      ['a delete-shaped request', { public_id: 'sample', timestamp: NOW }],
      ['an extra key', upload({ folder: 'x' })],
      ['overwrite', upload({ overwrite: true })],
      ['notification_url', upload({ notification_url: 'https://example.com' })],
      ['eval', upload({ eval: 'x' })],
    ])('%s', async (_name, paramsToSign) => {
      const res = await call({ paramsToSign });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid parameters' });
    });
  });

  describe('rejects the wrong upload preset', () => {
    it('a different preset', async () => {
      const res = await call({ paramsToSign: upload({ upload_preset: 'other' }) });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid parameters' });
    });

    it('no preset', async () => {
      const { upload_preset, ...paramsToSign } = upload();
      const res = await call({ paramsToSign });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid parameters' });
    });
  });

  describe('rejects malformed requests', () => {
    it.each([
      ['an empty body', {}],
      ['no body', undefined],
      ['a string', { paramsToSign: 'timestamp=1' }],
      ['null', { paramsToSign: null }],
      ['an array', { paramsToSign: [] }],
    ])('%s', async (_name, body) => {
      const res = await call(body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid parameters' });
    });
  });

  describe('rejects values that could add a parameter to the signed string', () => {
    it.each([
      ['an & in source', upload({ source: 'uw&tags=smug' })],
      ['an = in source', upload({ source: 'uw=1' })],
      ['a boolean source', upload({ source: true })],
      ['a null source', upload({ source: null })],
      ['an object source', upload({ source: { a: 1 } })],
      ['a null timestamp', upload({ timestamp: null })],
    ])('%s', async (_name, paramsToSign) => {
      const res = await call({ paramsToSign });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid parameter value' });
    });

    it('an & after the expected preset', async () => {
      const res = await call({ paramsToSign: upload({ upload_preset: `${PRESET}&x=1` }) });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid parameters' });
    });
  });

  describe('rejects timestamps outside the window', () => {
    it.each([
      ['just past the window in the future', NOW + 301],
      ['an hour in the future', NOW + 3600],
      ['a year in the future', NOW + 31536000],
      ['just past the window in the past', NOW - 301],
      ['a day in the past', NOW - 86400],
      ['a numeric string', String(NOW)],
      ['NaN', NaN],
      ['Infinity', Infinity],
    ])('%s', async (_name, timestamp) => {
      const res = await call({ paramsToSign: upload({ timestamp }) });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid timestamp' });
    });

    it('a missing timestamp', async () => {
      const { timestamp, ...paramsToSign } = upload();
      const res = await call({ paramsToSign });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid timestamp' });
    });
  });
});
