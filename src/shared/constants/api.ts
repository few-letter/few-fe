import type { WorldType } from "@/shared/types";

export const API_ROUTES = {
  CATEGORIES: (worldType: WorldType) =>
    `/api/v2/contents/${worldType}-news/categories`, //Category List
  GROUPS: (worldType: WorldType) => `/api/v2/contents/${worldType}-news/groups`, //DailyFew List
  CONTENTS: (worldType: WorldType) => `/api/v2/contents/${worldType}-news`, //카테고리 별 컨텐츠 목록
  CONTENT_TYPES: "/api/v1/contents/types", //컨텐츠 타입 목록

  CONTENT_DETAIL: (id: string) => `/api/v1/contents/${id}`, //컨텐츠 상세
  SUBSCRIBE: "/api/v2/subscriptions", //구독
} as const;

export const QUERY_KEY = {
  GET_CATEGORIES: (worldType: WorldType) => `get-categories-${worldType}`,
  GET_GROUPS: (worldType: WorldType) => `get-groups-${worldType}`,
  GET_CONTENTS: (worldType: WorldType) => `get-contents-${worldType}`,
  GET_CONTENT_DETAIL: "get-content-detail",
  GET_CONTENT_TYPES: "get-content-types",
} as const;
