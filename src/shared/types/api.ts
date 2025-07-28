/**
 * @description URLDef에서 사용하는 검색 파라미터 값 타입
 */

type SearchParamsValue = string | number | boolean | null | undefined;
type SearchParamsArray = Array<
  [string, SearchParamsValue | SearchParamsValue[]]
>;

type SearchParams =
  | string // 문자열
  | URLSearchParams // URLSearchParams 객체
  | Record<string, SearchParamsValue> // 객체
  | SearchParamsArray; // 배열

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type PathWithParams = [string, SearchParams?];

interface Middlewares {
  onRequest: ((request: Request) => Request)[];
  onResponse: ((response: Response) => Response)[];
  onError: ((error: Error) => Error)[];
}

interface TypedResponse<T = unknown> extends Response {
  data?: T;
}

export type {
  SearchParams,
  HTTPMethod,
  Middlewares,
  PathWithParams,
  TypedResponse,
};
