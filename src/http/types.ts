import type { IncomingMessage, ServerResponse } from 'node:http';

interface NoxRequest {
  body: unknown;
}

interface NoxResponse {
  body: unknown;
}

interface Route {
  method: RouteMethod;
  path: string;
  handler: RouteHandler;
}

interface IRouter {
  get: (path: NoxPath, handler: RouteHandler) => void;
  post: (path: NoxPath, handler: RouteHandler) => void;
  put: (path: NoxPath, handler: RouteHandler) => void;
  patch: (path: NoxPath, handler: RouteHandler) => void;
  delete: (path: NoxPath, handler: RouteHandler) => void;
  match: (
    method: RouteMethod | undefined,
    url: string | undefined,
  ) => MatchedRoute | undefined;
}

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;
type NoxPath = string;

type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface MatchedRoute {
  route: Route;
  params: Record<string, string>;
}

export type {
  IRouter,
  Route,
  RouteHandler,
  NoxPath,
  RouteMethod,
  MatchedRoute,
  NoxRequest,
  NoxResponse,
};