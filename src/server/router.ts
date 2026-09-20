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

  private add(method: RouteMethod, path: RoutePath, handlers: Handler[]): void {
    this.routes.push({ handlers, method, path });
  }

  public get(path: RoutePath, ...handlers: Handler[]): void {
    this.add('GET', path, handlers);
  }

  public post(path: RoutePath, ...handlers: Handler[]): void {
    this.add('POST', path, handlers);
  }

  public put(path: RoutePath, ...handlers: Handler[]): void {
    this.add('PUT', path, handlers);
  }

  public patch(path: RoutePath, ...handlers: Handler[]): void {
    this.add('PATCH', path, handlers);
  }

  public delete(path: RoutePath, ...handlers: Handler[]): void {
    this.add('DELETE', path, handlers);
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