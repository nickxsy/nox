import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { type NoxPath, type RouteHandler, Router } from "./router.js";

export class Nox {
  private readonly server: Server;
  private readonly router: Router;

  constructor() {
    this.server = createServer((req, res) => this.handleRequest(req, res));
    this.router = new Router();
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse) {
    const route = this.router.math(req.method, req.url);

    if (!route) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    route.handler(req, res);
  }

  public get(path: NoxPath, handler: RouteHandler): void {
    this.router.get(path, handler);
  }
  public listen(port?: number) {
    this.server.listen(port);
  }
}
