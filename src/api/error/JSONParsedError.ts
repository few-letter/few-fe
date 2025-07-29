export class JSONParsedError extends Error {
  public request: Request;
  public options: RequestInit;

  constructor(request: Request, options?: RequestInit) {
    super(
      `Request failed with parsing JSON: ${request.method} ${request.url} with options ${JSON.stringify(
        options || {},
      )}`,
    );

    this.name = "JSONParsedError";
    this.request = request;
    this.options = options || {};
  }
}
