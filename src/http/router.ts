import type { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;
export type NoxPath = string;

export type RouteMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Route = {
  method: RouteMethod;
  path: string;
  handler: RouteHandler;
};

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
      method: "GET",
      path,
      handler,
    });
  }

  public post(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      method: "POST",
      path,
      handler,
    });
  }

  public put(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      method: "PUT",
      path,
      handler,
    });
  }

  public patch(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      method: "PATCH",
      path,
      handler,
    });
  }

  public delete(path: NoxPath, handler: RouteHandler): void {
    this.routes.push({
      method: "DELETE",
      path,
      handler,
    });
  }

  public match(
    method: RouteMethod | undefined,
    url: string | undefined,
  ): Route | undefined {
    if (!url) return;

    const u = new URL(url, "http://localhost:8000");

    return this.routes.find(
      (route) => route.method === method && route.path === u.pathname,
    );
  }
}
