export class HTTPError extends Error {
  public response: Response;
  public request: Request;
  public options: RequestInit;

  constructor(
    request: Request,
    response: Response,
    options: RequestInit,
    serverMessage?: string,
  ) {
    const code =
      response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";

    const defaultMessage = `Request failed with ${reason}: ${request.method} ${request.url}`;

    super(serverMessage || defaultMessage);

    this.name = "HTTPError";
    this.response = response;
    this.request = request;
    this.options = options;
  }
}
