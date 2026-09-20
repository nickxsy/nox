import type { NoxRequest } from '../../src/server/request.js';
import type { NoxResponse } from '../../src/server/response.js';
import { Nox } from '../../src/server/server.js';
import type { NextFunction } from '../../src/server/types.js';

const PORT = 8080;
const app = new Nox();

const loggerMiddleware = (
  req: NoxRequest,
  res: NoxResponse,
  next: NextFunction,
): Promise<void> => {
  console.log('NextFunction');

  return next();
};

const requestIdMiddleware = (
  req: NoxRequest,
  res: NoxResponse,
  next: NextFunction,
): Promise<void> => {
  req.locals.requestId = crypto.randomUUID();

  return next();
};

app.get('/users', (req, res) => {
  res.text('Users');
});

app.get(
  '/posts',
  loggerMiddleware,
  requestIdMiddleware,
  async (req: NoxRequest, res: NoxResponse, _next): Promise<void> => {
    const body = (await req.body()) as { id: number; name: string };
    const reqId = req.locals.requestId;

    res.json({ id: body.id, name: body.name, reqId });
  },
);

app.get(
  '/posts/:id',
  async (req: NoxRequest, res: NoxResponse): Promise<void> => {
    await res.json({
      id: 1,
      title: 'Post title 1',
    });
  },
);

app.get('/posts/:id/comments/:commentId', (req, res) => {
  res.json({
    id: 1,
    title: 'Comment title 1',
  });
});

app.post('/posts', (req, res) => {
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
});

app.listen(PORT);