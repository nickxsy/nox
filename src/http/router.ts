import { matchPath } from './math-path.js';
import type {
  IRouter,
  MatchedRoute,
  NoxPath,
  Route,
  RouteHandler,
  RouteMethod,
} from './types.js';

export class Router implements IRouter {
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

    const urlObject = new URL(url, 'http://localhost:8080');

    for (const route of this.routes) {
      if (route.method === method) {
        const params = matchPath(route.path, urlObject.pathname);

        if (params) {
          return {
            params,
            route,
          };
        }
      }
    }
  }
}