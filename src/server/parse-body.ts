import type { IncomingMessage } from 'node:http';

import { badRequest } from './errors.js';

export const parseBody = <T = unknown>(
  req: IncomingMessage,
  body: string,
): T => {
  const contentType = req.headers['content-type'];

  if (contentType && contentType.includes('application/json')) {
    try {
      return JSON.parse(body) as T;
    } catch {
      throw badRequest('Invalid JSON body');
    }
  }

  return body as T;
};