import { URL_BASE } from './constants.js';
import { matchPath } from './math-path.js';
import type {
  IRouter,
  MatchedRoute,
  RoutePath,
  Route,
  Handler,
  RouteMethod,
} from './types.js';

export class Router implements IRouter {
  private readonly routes: Route[] = [];

  public get(path: RoutePath, ...handlers: Handler[]): void {
    this.routes.push({
      handlers,
      method: 'GET',
      path,
    });
  }

  public post(path: RoutePath, ...handlers: Handler[]): void {
    this.routes.push({
      handlers,
      method: 'POST',
      path,
    });
  }

  public put(path: RoutePath, ...handlers: Handler[]): void {
    this.routes.push({
      handlers,
      method: 'PUT',
      path,
    });
  }

  public patch(path: RoutePath, ...handlers: Handler[]): void {
    this.routes.push({
      handlers,
      method: 'PATCH',
      path,
    });
  }

  public delete(path: RoutePath, ...handlers: Handler[]): void {
    this.routes.push({
      handlers,
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