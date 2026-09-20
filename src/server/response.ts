import type { ServerResponse } from 'node:http';

export class NoxResponse<_TBody = unknown> {
  private readonly rawResponse: ServerResponse;

  public constructor(rawResponse: ServerResponse) {
    this.rawResponse = rawResponse;
  }

  public get headersSent(): boolean {
    return this.rawResponse.headersSent;
  }

  public get writableEnded(): boolean {
    return this.rawResponse.writableEnded;
  }

  public status(code: number): this {
    this.rawResponse.statusCode = code;
    return this;
  }
  public text(body: string): void {
    this.rawResponse.setHeader('Content-Type', 'text/plain');
    this.rawResponse.end(body);
  }

  public json(data: unknown): void {
    this.rawResponse.setHeader('Content-Type', 'application/json');
    this.rawResponse.end(JSON.stringify(data));
  }
}