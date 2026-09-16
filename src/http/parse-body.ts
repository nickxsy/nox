import type { IncomingMessage } from 'node:http';

export const parseBody = (res: IncomingMessage, body: string): unknown => {
  const contentType = res.headers['content-type'];

  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(body);
  }

  return body;
};