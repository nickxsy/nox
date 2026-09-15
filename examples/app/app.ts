import type { IncomingMessage, ServerResponse } from 'node:http';

import { Nox } from '../../src/http/server.js';

const PORT = 8080,

 app = new Nox();

app.get('/users', (req, res) => {
  res.end('Users');
});

async function getPosts(req: IncomingMessage, res: ServerResponse) {
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
}
async function getPostById(req: IncomingMessage, res: ServerResponse) {
  res.end(
    JSON.stringify({
      id: 1,
      title: 'Post title 1',
    }),
  );
}

async function createPost(req: IncomingMessage, res: ServerResponse) {
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
}

async function getPostCommentById(req: IncomingMessage, res: ServerResponse) {
  res.end(
    JSON.stringify({
      id: 1,
      title: 'Comment title 1',
    }),
  );
}

app.get('/posts', getPosts);
app.get('/posts/:id', getPostById);
app.get('/posts/:id/comments/:commentId', getPostCommentById);
app.post('/posts', createPost);

app.listen(PORT);