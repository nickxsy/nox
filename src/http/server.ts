import {
  type IncomingMessage,
  type ServerResponse,
  type Server,
  createServer,
} from 'node:http';

import { NoxRequest } from './request.js';
import { NoxResponse } from './response.js';
import { Router } from './router.js';
import type { IRouter, RoutePath, RouteHandler, RouteMethod } from './types.js';

const NOT_FOUND_CODE = 404;

export class Nox {
  private readonly server: Server;
  private readonly router: IRouter;

  public constructor() {
    this.server = createServer((req, res) => this.handleRequest(req, res));
    this.router = new Router();
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const matchedRoute = this.router.match(req.method as RouteMethod, req.url);

    if (!matchedRoute) {
      const response = new NoxResponse(res);

      response.status(NOT_FOUND_CODE);
      response.text('Not Found');

      return;
    }

    const request = new NoxRequest(req, matchedRoute.params);
    const response = new NoxResponse(res);

    matchedRoute.route.handler(request, response);
  }

  public get(path: RoutePath, handler: RouteHandler): void {
    this.router.get(path, handler);
  }

  public post(path: RoutePath, handler: RouteHandler): void {
    this.router.post(path, handler);
  }

  public put(path: RoutePath, handler: RouteHandler): void {
    this.router.put(path, handler);
  }

  public patch(path: RoutePath, handler: RouteHandler): void {
    this.router.patch(path, handler);
  }

  public delete(path: RoutePath, handler: RouteHandler): void {
    this.router.delete(path, handler);
  }

  public listen(port?: number): void {
    this.server.listen(port);
  }
}