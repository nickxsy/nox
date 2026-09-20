import type { IncomingMessage } from 'node:http';

import { payloadTooLarge } from './errors.js';

const DEFAULT_BODY_LIMIT = 1_048_576;

const readBody = (
  req: IncomingMessage,
  limit = DEFAULT_BODY_LIMIT,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    let settled = false;

    const fail = (error: Error): void => {
      if (!settled) {
        settled = true;
        reject(error);
      }
    };

    req.on('data', (chunk: Buffer) => {
      size += chunk.length;

      if (size > limit) {
        fail(payloadTooLarge());
        return;
      }

      chunks.push(chunk);
    });

    req.on('end', () => {
      if (!settled) {
        settled = true;
        resolve(Buffer.concat(chunks).toString('utf8'));
      }
    });

    req.on('aborted', () => fail(new Error('Request aborted')));
    req.on('error', fail);
  });

export { DEFAULT_BODY_LIMIT, readBody };