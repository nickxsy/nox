import type { NoxRequest } from './request.js';
import type { NoxResponse } from './response.js';

type NextFunction = (error?: unknown) => void;

type Handler = (
  req: NoxRequest<any, any, any, any>,
  res: NoxResponse,
  next: NextFunction,
) => void | Promise<void>;

type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RoutePath = string | RegExp;

interface Route {
  method: RouteMethod;
  path: RoutePath;
  handlers: Handler[];
}

interface IRouter {
  get: (path: RoutePath, ...handler: Handler[]) => void | Promise<void>;
  post: (path: RoutePath, ...handler: Handler[]) => void | Promise<void>;
  put: (path: RoutePath, ...handler: Handler[]) => void | Promise<void>;
  patch: (path: RoutePath, ...handler: Handler[]) => void | Promise<void>;
  delete: (path: RoutePath, ...handler: Handler[]) => void | Promise<void>;
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