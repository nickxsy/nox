import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from 'node:http';

import {
  type NoxPath,
  type RouteHandler,
  type RouteMethod,
  Router,
} from './router.js';

export class Nox {
  private readonly server: Server;
  private readonly router: Router;

  constructor() {
    this.server = createServer((req, res) => this.handleRequest(req, res));
    this.router = new Router();
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse) {
    const matchedRoute = this.router.match(req.method as RouteMethod, req.url);

    if (!matchedRoute) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    matchedRoute.route.handler(req, res);
  }

  public get(path: NoxPath, handler: RouteHandler): void {
    this.router.get(path, handler);
  }

  public post(path: NoxPath, handler: RouteHandler): void {
    this.router.post(path, handler);
  }

  public put(path: NoxPath, handler: RouteHandler): void {
    this.router.put(path, handler);
  }

  public patch(path: NoxPath, handler: RouteHandler): void {
    this.router.patch(path, handler);
  }

  public delete(path: NoxPath, handler: RouteHandler): void {
    this.router.delete(path, handler);
  }

  public listen(port?: number) {
    this.server.listen(port);
  }
}