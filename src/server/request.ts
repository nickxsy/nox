import type { IncomingHttpHeaders, IncomingMessage } from 'node:http';
import { type URLSearchParams, URL } from 'node:url';

import { URL_BASE } from './constants.js';
import { parseBody } from './parse-body.js';
import { DEFAULT_BODY_LIMIT, readBody } from './read-body.js';

export class NoxRequest<
  TParams = Record<string, string>,
  _TResBody = unknown,
  TReqBody = unknown,
  TQuery = URLSearchParams,
> {
  public readonly locals: Record<string, string> = {};
  private readonly req: IncomingMessage;
  private readonly urlObject: URL;
  private readonly routeParams: Record<string, string>;
  private readonly bodyLimit: number;
  private bodyPromise: Promise<TReqBody> | undefined;

  public constructor(
    req: IncomingMessage,
    params: Record<string, string> = {},
    bodyLimit?: number,
  ) {
    this.req = req;
    this.urlObject = new URL(req.url ?? '/', URL_BASE);
    this.routeParams = params;
    this.bodyLimit = bodyLimit ?? DEFAULT_BODY_LIMIT;
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

  public get query(): TQuery {
    return this.urlObject.searchParams as TQuery;
  }

  public get contentType(): string | undefined {
    return this.req.headers['content-type'];
  }

  public get params(): TParams {
    return this.routeParams as TParams;
  }

  public body(): Promise<TReqBody> {
    this.bodyPromise ??= this.readAndParseBody();

    return this.bodyPromise;
  }

  private async readAndParseBody(): Promise<TReqBody> {
    const body = await readBody(this.req, this.bodyLimit);
    return parseBody<TReqBody>(this.req, body);
  }
}