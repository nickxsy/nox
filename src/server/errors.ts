const BAD_REQUEST_CODE = 400;
const PAYLOAD_TOO_LARGE_CODE = 413;

class HttpError extends Error {
  public readonly statusCode: number;

  public constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
  }
}

const badRequest = (message = 'Bad Request'): HttpError =>
  new HttpError(BAD_REQUEST_CODE, message);

const payloadTooLarge = (message = 'Payload Too Large'): HttpError =>
  new HttpError(PAYLOAD_TOO_LARGE_CODE, message);

export { HttpError, badRequest, payloadTooLarge };