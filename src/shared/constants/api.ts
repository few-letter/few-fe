export const API_ROUTES = {
  CATEGORIES: "/api/v1/contents/categories", //Category List
  GROUPS: "/api/v1/contents/groups", //DailyFew List
  CONTENTS: "/api/v1/contents", //카테고리 별 컨텐츠 목록
  CONTENT_DETAIL: (id: string) => `/api/v1/contents/${id}`, //컨텐츠 상세
} as const;

export const QUERY_KEY = {
  GET_CATEGORIES: "get-categories",
  GET_GROUPS: "get-groups",
  GET_CONTENTS: "get-contents",
  GET_CONTENT_DETAIL: "get-content-detail",
} as const;
