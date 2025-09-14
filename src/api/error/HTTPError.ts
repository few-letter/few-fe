export class HTTPError extends Error {
  public response: Response;
  public request: Request;
  public options: RequestInit;
  public message: string = "";

  constructor(request: Request, response: Response, options: RequestInit) {
    const code =
      response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";

    super(`Request failed with ${reason}: ${request.method} ${request.url}`);

    this.name = "HTTPError";
    this.response = response;
    this.request = request;
    this.options = options;
  }

  async setErrorMessage() {
    const error = await this.response.json();
    this.message = error.message;
  }
}
