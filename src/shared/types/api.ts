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

/**
 * @description HTTPClient에서 사용하는 타입들
 */

export type { SearchParams };
