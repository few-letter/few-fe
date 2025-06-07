import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // next.config.js와 .env 파일을 로드하기 위한 Next.js 앱의 경로
  dir: "./",
});

// Jest에 적용할 커스텀 설정
const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-fixed-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
};

// createJestConfig를 내보내 next/jest가 비동기 Next.js 설정을 로드할 수 있도록 합니다
export default createJestConfig(customJestConfig);
