import type { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';

import { expect, test } from 'vitest';

import { readBody } from '../src/server/read-body.js';

test('reads an empty body', async () => {
  const request = Readable.from([]) as IncomingMessage;

  await expect(readBody(request)).resolves.toBe('');
});

test('reads and combines body chunks', async () => {
  const request = Readable.from([
    Buffer.from('hello '),
    Buffer.from('world'),
  ]) as IncomingMessage;

  await expect(readBody(request)).resolves.toBe('hello world');
});

test('decodes body as UTF-8', async () => {
  const body = 'Привет, мир!';
  const encodedBody = Buffer.from(body);
  const request = Readable.from([
    encodedBody.subarray(0, 3),
    encodedBody.subarray(3),
  ]) as IncomingMessage;

  await expect(readBody(request)).resolves.toBe(body);
});

test('rejects when the request emits an error', async () => {
  const error = new Error('request failed');
  async function* failingBody() {
    yield Buffer.alloc(0);
    throw error;
  }
  const request = Readable.from(failingBody()) as IncomingMessage;

  await expect(readBody(request)).rejects.toBe(error);
});

test('rejects when the body exceeds the limit', async () => {
  const request = Readable.from(['hello']) as IncomingMessage;

  await expect(readBody(request, 3)).rejects.toMatchObject({
    statusCode: 413,
  });
});