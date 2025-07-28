import { URLDef } from "./URLDef";
import { HTTPError } from "./error/HTTPError";
import type { TypedResponse } from "@/shared/types/api";

import type {
  Middlewares,
  HTTPMethod,
  PathWithParams,
} from "@/shared/types/api";

export class HTTPClient {
  private baseURL: string;
  private middlewares: Middlewares;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
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

  private async _fetch<T>(
    url: URLDef,
    method: HTTPMethod,
    options: RequestInit = {},
  ): Promise<TypedResponse<T>> {
    let request: Request;
    let response: TypedResponse<T>;

    try {
      request = new Request(url.generateURL(this.baseURL), {
        method,
        ...options,
      });

      this.middlewares.onRequest.forEach((middleware) => {
        request = middleware(request);
      });

      response = await fetch(request);

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
        processedError = middleware(processedError);
      });

      throw processedError;
    }
  }

  public async get<T>(
    [path, searchParams]: PathWithParams,
    options: RequestInit = {},
  ): Promise<TypedResponse<T>> {
    const urlDef = new URLDef(path, searchParams);
    return this._fetch(urlDef, "GET", options);
  }

  public async post<T>(
    [path, searchParams]: PathWithParams,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<TypedResponse<T>> {
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

  public async put<T>(
    [path, searchParams]: PathWithParams,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<TypedResponse<T>> {
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

  public async patch<T>(
    [path, searchParams]: PathWithParams,
    body?: unknown,
    options: RequestInit = {},
  ): Promise<TypedResponse<T>> {
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

  public async delete<T>(
    [path, searchParams]: PathWithParams,
    options: RequestInit = {},
  ): Promise<TypedResponse<T>> {
    const urlDef = new URLDef(path, searchParams);
    return this._fetch(urlDef, "DELETE", options);
  }
}
