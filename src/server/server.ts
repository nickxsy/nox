import {
  type IncomingMessage,
  type ServerResponse,
  type Server,
  createServer,
} from 'node:http';

import { NoxRequest } from './request.js';
import { NoxResponse } from './response.js';
import { Router } from './router.js';
import type { IRouter, RoutePath, Handler, RouteMethod } from './types.js';

const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = 500;
const FIRST_HANDLER_INDEX = 0;

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

    const execute = async (index: number): Promise<void> => {
      const handler = matchedRoute.route.handlers[index];
      const STEP_VALUE = 1;

      if (!handler) {
        return;
      }

      const next = (): void => {
        execute(index + STEP_VALUE);
      };

      try {
        const result = handler(request, response, next);

        Promise.resolve(result).catch((error) => {
          console.error(error);

          response.status(INTERNAL_SERVER_ERROR);
          response.text('Internal Server Error');
        });
      } catch (error) {
        console.error(error);

        response.status(INTERNAL_SERVER_ERROR);
        response.text('Internal Server Error');
      }
    };

    execute(FIRST_HANDLER_INDEX);
  }

  public get(path: RoutePath, ...handlers: Handler[]): void {
    this.router.get(path, ...handlers);
  }

  public post(path: RoutePath, ...handlers: Handler[]): void {
    this.router.post(path, ...handlers);
  }

  public put(path: RoutePath, ...handlers: Handler[]): void {
    this.router.put(path, ...handlers);
  }

  public patch(path: RoutePath, ...handlers: Handler[]): void {
    this.router.patch(path, ...handlers);
  }

  public delete(path: RoutePath, ...handlers: Handler[]): void {
    this.router.delete(path, ...handlers);
  }

  public listen(port?: number): void {
    this.server.listen(port);
  }
}