import { expect, test } from 'vitest';

import { Router } from './router.js';

test('matches GET route', () => {
  const router = new Router(),
    handler = () => {};
  router.get('/posts', handler);
  const route = router.match('GET', '/posts');

  expect(route).toStrictEqual({
    params: {},
    route: {
      handlers: [handler],
      method: 'GET',
      path: '/posts',
    },
  });
});

test('does not match route with different method', () => {
  const router = new Router(),
    handler = () => {};
  router.get('/posts', handler);

  const route = router.match('POST', '/posts');

  expect(route).toBeUndefined();
});

test('does not match unknown path', () => {
  const router = new Router(),
    handler = () => {};
  router.get('/posts', handler);

  const route = router.match('GET', '/users');

  expect(route).toBeUndefined();
});

test('ignores query string when matching route', () => {
  const router = new Router(),
    handler = () => {};
  router.get('/posts', handler);

  const route = router.match('GET', '/posts?page=2');

  expect(route).toStrictEqual({
    params: {},
    route: {
      handlers: [handler],
      method: 'GET',
      path: '/posts',
    },
  });
});

test('matches URL with query string 2', () => {
  const router = new Router(),
    handler = () => {};
  router.get('/posts/:postId/comments/:commentId', handler);

  const route = router.match('GET', '/posts/1/comments/12');

  expect(route).toStrictEqual({
    params: {
      commentId: '12',
      postId: '1',
    },
    route: {
      handlers: [handler],
      method: 'GET',
      path: '/posts/:postId/comments/:commentId',
    },
  });
});

test('matches URL with query string 3', () => {
  const router = new Router();

  router.get('/posts/:postId/comments/:commentId', () => {});

  const route = router.match('GET', '/users/1/comments/12');

  expect(route).toBeUndefined();
});