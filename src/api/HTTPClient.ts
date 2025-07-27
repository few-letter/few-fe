import { env } from "process";
import { URLDef } from "./URLDef";
import { HTTPError } from "./error/HTTPError";

import type {
  Middlewares,
  HTTPMethod,
  PathWithParams,
} from "@/shared/types/api";

class HTTPClient {
  private baseURL: string;
  private middlewares: Middlewares;

  constructor() {
    this.baseURL = env.NEXT_PUBLIC_API_URL || "";
    this.middlewares = {
      onRequest: [],
      onResponse: [],
      onError: [],
    };
  }

  public use(middlewares: Middlewares) {
    this.middlewares.onRequest = middlewares.onRequest;
    this.middlewares.onResponse = middlewares.onResponse;
    this.middlewares.onError = middlewares.onError;

    return this;
  }

  private async _fetch(
    url: URLDef,
    method: HTTPMethod,
    options: RequestInit = {},
  ): Promise<Response> {
    let request: Request;
    let response: Response;

    try {
      request = new Request(url.generateURL(this.baseURL), {
        method,
        ...options,
      });

      this.middlewares.onRequest.forEach((middleware) => {
        request = middleware(request);
      });

      let response = await fetch(request);

      this.middlewares.onResponse.forEach((middleware) => {
        response = middleware(response);
      });

      if (response.status >= 400) {
        throw new HTTPError(request, response, options);
      }

      return response;
    } catch (error) {
      let processedError = error as Error;

      this.middlewares.onError.forEach((middleware) => {
        processedError = middleware(request, response, processedError);
      });

      throw processedError;
    }
  }

  public async get(
    [path, searchParams]: PathWithParams,
    options: RequestInit = {},
  ): Promise<Response> {
    const urlDef = new URLDef(path, searchParams);
    return this._fetch(urlDef, "GET", options);
  }

  public async post(
    [path, searchParams]: PathWithParams,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<Response> {
    const urlDef = new URLDef(path, searchParams);
    const requestOptions: RequestInit = {
      ...options,
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };
    return this._fetch(urlDef, "POST", requestOptions);
  }

  public async put(
    [path, searchParams]: PathWithParams,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<Response> {
    const urlDef = new URLDef(path, searchParams);
    const requestOptions: RequestInit = {
      ...options,
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };
    return this._fetch(urlDef, "PUT", requestOptions);
  }

  public async patch(
    [path, searchParams]: PathWithParams,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<Response> {
    const urlDef = new URLDef(path, searchParams);
    const requestOptions: RequestInit = {
      ...options,
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };
    return this._fetch(urlDef, "PATCH", requestOptions);
  }

  public async delete(
    [path, searchParams]: PathWithParams,
    options: RequestInit = {},
  ): Promise<Response> {
    const urlDef = new URLDef(path, searchParams);
    return this._fetch(urlDef, "DELETE", options);
  }
}

export default HTTPClient;
