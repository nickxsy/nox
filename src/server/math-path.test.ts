import { expect, test } from 'vitest';

import { matchPath } from './math-path.js';

test('matches path route with one parameter', () => {
  expect(matchPath('/posts/:id', '/posts/12')).toStrictEqual({
    id: '12',
  });
});

test('matches path route', () => {
  expect(
    matchPath(
      '/posts/:id/comment/author/:authorId',
      '/posts/12/comment/author/12',
    ),
  ).toStrictEqual({
    authorId: '12',
    id: '12',
  });
});

test('returns undefined for different static segment', () => {
  expect(matchPath('/posts/:id', '/users/42')).toBeUndefined();
});

test('returns undefined for different segment count', () => {
  expect(matchPath('/posts/:id', '/posts/42/comments')).toBeUndefined();
});