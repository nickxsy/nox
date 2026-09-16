import { URL_BASE } from './constants.js';
import { matchPath } from './math-path.js';
import type {
  IRouter,
  MatchedRoute,
  RoutePath,
  Route,
  RouteHandler,
  RouteMethod,
} from './types.js';

export class Router implements IRouter {
  private readonly routes: Route[] = [];

  public get(path: RoutePath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'GET',
      path,
    });
  }

  public post(path: RoutePath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'POST',
      path,
    });
  }

  public put(path: RoutePath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'PUT',
      path,
    });
  }

  public patch(path: RoutePath, handler: RouteHandler): void {
    this.routes.push({
      handler,
      method: 'PATCH',
      path,
    });
  }

  public delete(path: RoutePath, handler: RouteHandler): void {
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

    const urlObject = new URL(url, URL_BASE);

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