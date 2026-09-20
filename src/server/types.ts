import type { NoxRequest } from './request.js';
import type { NoxResponse } from './response.js';

type NextFunction = () => Promise<void>;

type Handler = (
  req: NoxRequest,
  res: NoxResponse,
  next: NextFunction,
) => void | Promise<void>;

type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RoutePath = string;

interface Route {
  method: RouteMethod;
  path: RoutePath;
  handlers: Handler[];
}

interface IRouter {
  get: (path: RoutePath, ...handler: Handler[]) => void;
  post: (path: RoutePath, ...handler: Handler[]) => void;
  put: (path: RoutePath, ...handler: Handler[]) => void;
  patch: (path: RoutePath, ...handler: Handler[]) => void;
  delete: (path: RoutePath, ...handler: Handler[]) => void;
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
  Handler,
  RouteMethod,
  NextFunction,
};