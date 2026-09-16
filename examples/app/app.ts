import type { IncomingMessage, ServerResponse } from 'node:http';

import { Nox } from '../../src/http/server.js';

const PORT = 8080,
  app = new Nox();

app.get('/users', (req, res) => {
  res.end('Users');
});

const getPosts = (_req: IncomingMessage, res: ServerResponse): void => {
  res.end(
    JSON.stringify([
      {
        id: 1,
        title: 'Post title 1',
      },
      {
        id: 2,
        title: 'Post title 2',
      },
    ]),
  );
};
const getPostById = (_req: IncomingMessage, res: ServerResponse): void => {
  res.end(
    JSON.stringify({
      id: 1,
      title: 'Post title 1',
    }),
  );
};

const createPost = (_req: IncomingMessage, res: ServerResponse): void => {
  res.end(
    JSON.stringify([
      {
        id: 1,
        title: 'Post title 1',
      },
      {
        id: 2,
        title: 'Post title 2',
      },
    ]),
  );
};

const getPostCommentById = (
  _req: IncomingMessage,
  res: ServerResponse,
): void => {
  res.end(
    JSON.stringify({
      id: 1,
      title: 'Comment title 1',
    }),
  );
};

app.get('/posts', getPosts);
app.get('/posts/:id', getPostById);
app.get('/posts/:id/comments/:commentId', getPostCommentById);
app.post('/posts', createPost);

app.listen(PORT);