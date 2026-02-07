# CLAUDE.md

This file provides guidance for Claude Code when working with this project.

## Project Overview

**Few Letter** - AI 뉴스 큐레이션 구독 서비스의 프론트엔드 애플리케이션

- **Framework**: Next.js 15.3.8 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm 8

## Build & Development Commands

```bash
pnpm dev          # 개발 서버 (Turbopack)
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 실행
pnpm lint         # ESLint 검사
pnpm test         # Jest 테스트
pnpm test:watch   # 테스트 watch 모드
```

## Project Structure

```
/src
├── /app                    # Next.js App Router 페이지
├── /api                    # API 통신 레이어
│   ├── HTTPClient.ts       # 커스텀 HTTP 클라이언트
│   ├── URLDef.ts           # URL 빌더
│   ├── /client             # API 클라이언트 인스턴스
│   ├── /middleware         # 요청/응답 미들웨어
│   └── /error              # 에러 클래스
├── /shared
│   ├── /components         # 재사용 UI 컴포넌트
│   ├── /widgets            # 페이지 영역 컴포넌트
│   ├── /remotes            # React Query 데이터 페칭
│   ├── /hooks              # 커스텀 훅
│   ├── /providers          # Context Providers
│   ├── /types              # TypeScript 타입 정의
│   ├── /constants          # 상수 (API 라우트, Query Key 등)
│   └── /utils              # 유틸리티 함수
├── /lib                    # 외부 라이브러리 통합 (Mixpanel)
└── /__tests__              # 테스트 파일 (MSW 핸들러 포함)
```

## Key Technologies & Patterns

### State Management
- **React Query 5**: 서버 상태 관리
  - `queryOptions` 패턴 사용
  - `useSuspenseQuery` 훅 사용
  - SSR: `prefetchQuery` + `HydrationBoundary`

### Data Fetching Pattern
```typescript
// 1. Remote (데이터 페칭)
const getCategories = async () => few.get<ResponseType>([API_ROUTES.CATEGORIES]);

// 2. Query Options
const getCategoriesOptions = () => queryOptions({
  queryKey: [QUERY_KEY.GET_CATEGORIES],
  queryFn: () => getCategories(),
});

// 3. Custom Hook
export const useCategories = () => {
  const { data } = useSuspenseQuery(getCategoriesOptions());
  return data.data;
};
```

### API Communication
- 커스텀 `HTTPClient` (fetch 기반)
- 미들웨어 체인: `onRequest`, `onResponse`, `onError`
- 에러: `HTTPError`, `JSONParsedError`

### Styling
- **Tailwind CSS 4**: Utility-first CSS
- `cn()` 함수: `clsx` + `tailwind-merge` 조합
- `lucide-react`: 아이콘
- `lottie-web`: 애니메이션

### Testing
- **Jest** + **React Testing Library**
- **MSW 2**: API 모킹 (`src/__tests__/mocks/handlers.ts`)

### Analytics (Mixpanel)

싱글톤 패턴으로 구현된 `MixpanelService` 사용 (`src/lib/mixpanel.ts`)

```typescript
// 인스턴스 가져오기
const mixpanel = MixpanelService.getInstance();

// 주요 메서드
mixpanel.startSession();                    // 세션 시작 (페이지, referrer, user_agent 자동 수집)
mixpanel.track("event_name", { key: val }); // 커스텀 이벤트 트래킹
mixpanel.trackPageView("page_name");        // 페이지뷰 트래킹
mixpanel.identifySubscriber("email");       // 구독자 식별 및 프로필 설정
mixpanel.startSessionRecording();           // 세션 녹화 시작
mixpanel.stopSessionRecording();            // 세션 녹화 중지
mixpanel.reset();                           // 사용자 데이터 초기화
```

**초기화**: `MixpanelProvider`가 앱 마운트 시 자동으로 `startSession()` 호출

**설정**:
- Production: 세션 녹화 100%, 히트맵 활성화
- Development: 디버그 모드, 세션 녹화 비활성화

## Import Order (ESLint)

```typescript
import {} from "next/...";           // 1. Next.js
import {} from "react";              // 2. React
import {} from "@tanstack/...";      // 3. TanStack
import {} from "external-package";   // 4. 외부 패키지
import {} from "@/api/...";          // 5. API
import {} from "@/shared/...";       // 6. Shared
import {} from "./local";            // 7. 로컬 파일
```

## Path Aliases

- `@/*` → `./src/*`

## Environment Variables

```
NEXT_PUBLIC_API_URL          # API 베이스 URL
NEXT_PUBLIC_MIXPANEL_TOKEN   # Mixpanel 토큰
```

## Code Style

- **Prettier**: 큰 따옴표, Tab Width 2, Trailing Comma all
- **Tailwind CSS 클래스 자동 정렬** 활성화
- Barrel export 패턴 사용 (`/components/index.ts`)

## Component Types

1. **Server Components** (기본): 서버에서 데이터 프리페칭
2. **Client Components** (`"use client"`): 상호작용 필요한 컴포넌트
3. **Widgets**: 여러 컴포넌트 조합한 페이지 영역
4. **Presentational**: Props 기반 순수 UI 컴포넌트

## Types

```typescript
// WorldType - 뉴스 월드 구분
enum WorldType {
  LOCAL = "local-news",    // 국내 뉴스
  GLOBAL = "global-news",  // 해외 뉴스
}
```

## Client Routes

```typescript
CLIENT_ROUTES = {
  HOME: "/",
  LOCAL: "/local-news",
  GLOBAL: "/global-news",
  SUBSCRIPTION: "/subscription",
  DELETE_SUBSCRIPTION: "/delete-subscription",
}
```

## API Routes

```typescript
API_ROUTES = {
  CATEGORIES: (worldType: WorldType) => `/api/v2/contents/${worldType}/categories`,
  GROUPS: (worldType: WorldType) => `/api/v2/contents/${worldType}/groups`,
  CONTENTS: (worldType: WorldType) => `/api/v2/contents/${worldType}`,
  CONTENT_DETAIL: (id: string) => `/api/v1/contents/${id}`,
  SUBSCRIBE: "/api/v2/subscriptions",
}
```

### API Endpoints

| # | 설명 | Method | Endpoint |
|---|------|--------|----------|
| 1 | 데일리 few 조회 (국내) | GET | `/api/v2/contents/local-news/groups` |
| 2 | 데일리 few 조회 (해외) | GET | `/api/v2/contents/global-news/groups` |
| 3 | 국내 카테고리 조회 | GET | `/api/v2/contents/local-news/categories` |
| 4 | 해외 카테고리 조회 | GET | `/api/v2/contents/global-news/categories` |
| 5 | 국내 한줄요약 few 스크롤 | GET | `/api/v2/contents/local-news` |
| 6 | 해외 한줄요약 few 스크롤 | GET | `/api/v2/contents/global-news` |
| 7 | 한줄요약 few 상세조회 (국내/해외 동일) | GET | `/api/v1/contents/{id}` |
| 8 | 구독 시 국내 / 해외 구분 카테고리 조회 | GET | `/api/v1/contents/types` |
| 9 | 구독 정보 조회 | GET | `/api/v2/subscriptions` |
| 10 | 구독 등록 | POST | `/api/v2/subscriptions` |
| 11 | 구독 취소 | DELETE | `/api/v2/subscriptions` |

## Query Keys

```typescript
QUERY_KEY = {
  GET_CATEGORIES: (worldType: WorldType) => `get-categories-${worldType}`,
  GET_GROUPS: (worldType: WorldType) => `get-groups-${worldType}`,
  GET_CONTENTS: (worldType: WorldType) => `get-contents-${worldType}`,
  GET_CONTENT_DETAIL: "get-content-detail",
}
```

## Domain Logic: 카드 이미지

뉴스 카드의 배경 이미지는 API 응답의 `thumbnailImageUrl`을 우선 사용하고, 없을 경우 카테고리별 기본 이미지(`CATEGORY_CODE_TO_IMAGE`)로 폴백한다.

| 컴포넌트 | 이미지 소스 | 클릭 동작 |
|-----------|------------|-----------|
| **NewsCard** (데일리 few) | `DailyFewSection`에서 `CATEGORY_CODE_TO_IMAGE[category]`를 `image` prop으로 전달 | 클릭 비활성 (상세 페이지 리다이렉트 없음) |
| **Card** (한줄요약 few) | API의 `thumbnailImageUrl` 우선, null이면 `CATEGORY_CODE_TO_IMAGE[categoryCode]` 폴백 | 상세 페이지(`/${worldType}/${id}`)로 이동 |

- `CATEGORY_CODE_TO_IMAGE`는 `src/shared/constants/style.ts`에 정의 (`CategoryCode → 이미지 경로` 매핑)
- 이미지 경로: `/images/newscard/category{code}.png`
