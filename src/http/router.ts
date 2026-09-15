import type { IncomingMessage, ServerResponse } from 'node:http';

import { matchPath } from './math-path.js';

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;
export type NoxPath = string;

export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface MatchedRoute {
  route: Route;
  params: Record<string, string>;
}

interface Route {
  method: RouteMethod;
  path: string;
  handler: RouteHandler;
}

export interface Router {
  get(path: NoxPath, handler: RouteHandler): void;
  post(path: NoxPath, handler: RouteHandler): void;
  put(path: NoxPath, handler: RouteHandler): void;
  patch(path: NoxPath, handler: RouteHandler): void;
  delete(path: NoxPath, handler: RouteHandler): void;
}

export class Router implements Router {
  private readonly routes: Route[] = [];

  public get(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'GET',
      path,
    });
  }

  public post(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'POST',
      path,
    });
  }

  public put(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'PUT',
      path,
    });
  }

  public patch(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'PATCH',
      path,
    });
  }

  public delete(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'DELETE',
      path,
    });
  }

  public match(
    method: RouteMethod | undefined,
    url: string | undefined,
  ): MatchedRoute | undefined {
    if (!url) {
      return;
    }

    const u = new URL(url, 'http://localhost:8080');

    for (const route of this.routes) {
      if (route.method !== method) {
        continue;
      }

      const params = matchPath(route.path, u.pathname);

      if (params) {
        return {
          params,
          route,
        };
      }
    }
  }
}