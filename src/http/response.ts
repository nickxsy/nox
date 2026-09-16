import type { ServerResponse } from 'node:http';

export class NoxResponse {
  private readonly rawResponse: ServerResponse;

  public constructor(rawResponse: ServerResponse) {
    this.rawResponse = rawResponse;
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