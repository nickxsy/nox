import {
  type IncomingMessage,
  type ServerResponse,
  type Server,
  createServer,
} from 'node:http';

import { dispatch } from './dispatcher.js';
import { HttpError } from './errors.js';
import { DEFAULT_BODY_LIMIT } from './read-body.js';
import { NoxRequest } from './request.js';
import { NoxResponse } from './response.js';
import { Router } from './router.js';
import type { Handler, IRouter, RouteMethod, RoutePath } from './types.js';

const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR = 500;
export interface NoxOptions {
  bodyLimit?: number;
}

export class Nox {
  private readonly server: Server;
  private readonly router: IRouter;
  private readonly bodyLimit: number;

  public constructor(options: NoxOptions = {}) {
    this.bodyLimit = options.bodyLimit ?? DEFAULT_BODY_LIMIT;
    this.server = createServer((req, res) => {
      this.handleRequest(req, res).catch(console.error);
    });
    this.router = new Router();
  }

  private async handleRequest(
    req: IncomingMessage,
    rawResponse: ServerResponse,
  ): Promise<void> {
    const matchedRoute = this.router.match(req.method as RouteMethod, req.url);
    const response = new NoxResponse(rawResponse);

    if (!matchedRoute) {
      response.status(NOT_FOUND_CODE).text('Not Found');
      return;
    }

    const request = new NoxRequest(req, matchedRoute.params, this.bodyLimit);

    try {
      await dispatch(matchedRoute.route.handlers, request, response);
    } catch (error) {
      Nox.handleError(error, response);
    }
  }

  private static handleError(error: unknown, response: NoxResponse): void {
    if (response.headersSent || response.writableEnded) {
      return;
    }

    if (error instanceof HttpError) {
      response.status(error.statusCode).text(error.message);
      return;
    }

    console.error(error);
    response.status(INTERNAL_SERVER_ERROR).text('Internal Server Error');
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

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}