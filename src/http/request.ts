import type { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import { type URLSearchParams, URL } from 'node:url';

import { URL_BASE } from './constants.js';
import { readBody } from './read-body.js';

export class NoxRequest {
  private readonly req: IncomingMessage;
  private readonly urlObject: URL;
  private readonly routeParams: Record<string, string>;

  public constructor(
    req: IncomingMessage,
    params: Record<string, string> = {},
  ) {
    this.req = req;
    this.urlObject = new URL(req.url ?? '/', URL_BASE);
    this.routeParams = params;
  }

  public get method(): string | undefined {
    return this.req.method;
  }

  public get url(): string | undefined {
    return this.req.url;
  }

  public get headers(): IncomingHttpHeaders {
    return this.req.headers;
  }

  public get path(): string {
    return this.urlObject.pathname;
  }

  public get query(): URLSearchParams {
    return this.urlObject.searchParams;
  }

  public get contentType(): string | undefined {
    return this.req.headers['content-type'];
  }

  public get params(): Record<string, string> {
    return this.routeParams;
  }

  public async body(): Promise<unknown> {
    const body = await readBody(this.req);

    return body;
  }
}