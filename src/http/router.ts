import type { IncomingMessage, ServerResponse } from "node:http";

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;
export type NoxPath = string;

type Route = {
  method: string;
  path: string;
  handler: RouteHandler;
};

export interface Router {
  get(path: NoxPath, handler: RouteHandler): void;
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

  public math(
    method: string | undefined,
    url: string | undefined,
  ): Route | undefined {
    return this.routes.find(
      (route) => route.method === method && route.path === url,
    );
  }
}
