import type { NoxRequest } from '../../src/http/request.js';
import type { NoxResponse } from '../../src/http/response.js';
import { Nox } from '../../src/http/server.js';

const PORT = 8080;
const app = new Nox();

app.get('/users', (req, res) => {
  res.text('Users');
});

const getPosts = async (req: NoxRequest, res: NoxResponse): Promise<void> => {
  console.log(await req.body());
  res.json([
    {
      id: 1,
      title: 'Post title 1',
    },
    {
      id: 2,
      title: 'Post title 2',
    },
  ]);
};
const getPostById = (req: NoxRequest, res: NoxResponse): void => {
  res.json({
    id: 1,
    title: 'Post title 1',
  });
};

const createPost = (req: NoxRequest, res: NoxResponse): void => {
  res.json([
    {
      id: 1,
      title: 'Post title 1',
    },
    {
      id: 2,
      title: 'Post title 2',
    },
  ]);
};

const getPostCommentById = (req: NoxRequest, res: NoxResponse): void => {
  res.json({
    id: 1,
    title: 'Comment title 1',
  });
};

app.get('/posts', () => getPosts);
app.get('/posts/:id', getPostById);
app.get('/posts/:id/comments/:commentId', getPostCommentById);
app.post('/posts', createPost);

app.listen(PORT);