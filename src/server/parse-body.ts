import type { IncomingMessage } from 'node:http';

export const parseBody = <T = unknown>(
  req: IncomingMessage,
  body: string,
): T => {
  const contentType = req.headers['content-type'];

  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(body);
  }

  return body as T;
};