import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers } from "./src/__tests__/mocks/handlers";

// 테스트 환경에서 MSW 서버를 설정합니다
export const server = setupServer(...handlers);

// 모든 테스트 전에 서버를 시작합니다
beforeAll(() => server.listen());

// 각 테스트 후에 서버를 리셋합니다
afterEach(() => server.resetHandlers());

// 모든 테스트 후에 서버를 종료합니다
afterAll(() => server.close());
