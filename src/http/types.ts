import type { NoxRequest } from './request.js';
import type { NoxResponse } from './response.js';

type RouteHandler = (req: NoxRequest, res: NoxResponse) => void;
type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RoutePath = string;

interface Route {
  method: RouteMethod;
  path: string;
  handler: RouteHandler;
}

interface IRouter {
  get: (path: RoutePath, handler: RouteHandler) => void;
  post: (path: RoutePath, handler: RouteHandler) => void;
  put: (path: RoutePath, handler: RouteHandler) => void;
  patch: (path: RoutePath, handler: RouteHandler) => void;
  delete: (path: RoutePath, handler: RouteHandler) => void;
  match: (
    method: RouteMethod | undefined,
    url: string | undefined,
  ) => MatchedRoute | undefined;
}

interface MatchedRoute {
  route: Route;
  params: Record<string, string>;
}

export type {
  IRouter,
  MatchedRoute,
  RoutePath,
  Route,
  RouteHandler,
  RouteMethod,
};