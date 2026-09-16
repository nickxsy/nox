import { once } from 'node:events';
import type { Server } from 'node:http';

import supertest from 'supertest';
import { afterEach, expect, test } from 'vitest';

import { Nox } from './server.js';

const servers: Server[] = [];

async function startServer(app: Nox): Promise<Server> {
  const server = (app as unknown as { server: Server }).server;
  servers.push(server);
  app.listen(0);
  await once(server, 'listening');
  return server;
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        }),
    ),
  );
});

test('calls the matching handler and passes request and response', async () => {
  const app = new Nox();
  let receivedUrl: string | undefined;

  app.get('/posts', (req, res) => {
    receivedUrl = req.url;
    res.end('posts');
  });

  const response = await supertest(await startServer(app)).get('/posts');

  expect(response.status).toBe(200);
  expect(response.text).toBe('posts');
  expect(receivedUrl).toBe('/posts');
});

test('ignores query strings when matching a route', async () => {
  const app = new Nox();
  app.get('/posts', (_req, res) => res.end('posts'));

  const response = await supertest(await startServer(app)).get('/posts?page=2');

  expect(response.status).toBe(200);
  expect(response.text).toBe('posts');
});

test('returns 404 for an unknown route and method', async () => {
  const app = new Nox();
  app.get('/posts', (_req, res) => res.end('posts'));
  const server = await startServer(app);

  await supertest(server).get('/users').expect(404, 'Not Found');
  await supertest(server).post('/posts').expect(404, 'Not Found');
});

test.each([
  ['GET', 'get'],
  ['POST', 'post'],
  ['PUT', 'put'],
  ['PATCH', 'patch'],
  ['DELETE', 'delete'],
] as const)('supports the %s route method', async (method, register) => {
  const app = new Nox();
  app[register]('/resource', (_req, res) => res.end(method));

  const response = await supertest(await startServer(app))[register](
    '/resource',
  );

  expect(response.status).toBe(200);
  expect(response.text).toBe(method);
});