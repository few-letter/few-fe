import { URLDef } from "@/api/URLDef";

const originalEnv = process.env;

describe("URLDef", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("기본 기능", () => {
    test("baseURL 없이 path만으로 URL 생성", () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const urlDef = new URLDef("/api/users");
      expect(urlDef.getURL()).toBe("/api/users");
    });

    test("baseURL과 path 조합", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";
      const urlDef = new URLDef("/api/users");
      expect(urlDef.getURL()).toBe("https://api.example.com/api/users");
    });

    test("path 앞에 /가 없어도 자동 추가", () => {
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const urlDef = new URLDef("api/users");
      expect(urlDef.getURL()).toBe("/api/users");
    });

    test("baseURL 끝의 / 자동 제거", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com/";
      const urlDef = new URLDef("/api/users");
      expect(urlDef.getURL()).toBe("https://api.example.com/api/users");
    });
  });

  describe("쿼리 파라미터 처리", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";
    });

    test("객체 형태 파라미터", () => {
      const urlDef = new URLDef("/api/users", {
        page: 1,
        limit: 10,
        active: true,
      });
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/users?page=1&limit=10&active=true",
      );
    });

    test("문자열 형태 파라미터", () => {
      const urlDef = new URLDef("/api/users", "page=1&limit=10");
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/users?page=1&limit=10",
      );
    });

    test("? 포함 문자열 파라미터", () => {
      const urlDef = new URLDef("/api/users", "?page=1&limit=10");
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/users?page=1&limit=10",
      );
    });

    test("URLSearchParams 객체", () => {
      const searchParams = new URLSearchParams();
      searchParams.append("category", "tech");
      searchParams.append("sort", "date");
      const urlDef = new URLDef("/api/posts", searchParams);
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/posts?category=tech&sort=date",
      );
    });

    test("배열 형태 파라미터", () => {
      const urlDef = new URLDef("/api/search", [
        ["q", "javascript"],
        ["type", "tutorial"],
      ]);
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/search?q=javascript&type=tutorial",
      );
    });

    test("빈 파라미터", () => {
      const urlDef = new URLDef("/api/health");
      expect(urlDef.getURL()).toBe("https://api.example.com/api/health");
    });

    test("빈 문자열 파라미터", () => {
      const urlDef = new URLDef("/api/health", "");
      expect(urlDef.getURL()).toBe("https://api.example.com/api/health");
    });
  });

  describe("엣지 케이스", () => {
    test("특수 문자 포함 파라미터", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";
      const urlDef = new URLDef("/api/search", {
        q: "hello world!",
        filter: "type:article",
      });
      const result = urlDef.getURL();
      expect(result).toContain("q=hello+world%21");
      expect(result).toContain("filter=type%3Aarticle");
    });

    test("undefined 파라미터 처리", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";
      const urlDef = new URLDef("/api/users", undefined);
      expect(urlDef.getURL()).toBe("https://api.example.com/api/users");
    });

    test("숫자 0 파라미터", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";
      const urlDef = new URLDef("/api/users", { page: 0, limit: 0 });
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/users?page=0&limit=0",
      );
    });

    test("boolean false 파라미터", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";
      const urlDef = new URLDef("/api/users", { active: false });
      expect(urlDef.getURL()).toBe(
        "https://api.example.com/api/users?active=false",
      );
    });
  });

  describe("실제 사용 시나리오", () => {
    test("API 엔드포인트 생성", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.myapp.com";

      // 사용자 목록 조회
      const usersURL = new URLDef("/users", { page: 1, per_page: 20 });
      expect(usersURL.getURL()).toBe(
        "https://api.myapp.com/users?page=1&per_page=20",
      );

      // 게시글 검색
      const searchURL = new URLDef("/posts/search", {
        q: "React",
        category: "tech",
        sort: "created_at",
      });
      expect(searchURL.getURL()).toBe(
        "https://api.myapp.com/posts/search?q=React&category=tech&sort=created_at",
      );
    });

    test("개발/운영 환경 분리", () => {
      // 개발 환경
      process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3001";
      const devURL = new URLDef("/api/data");
      expect(devURL.getURL()).toBe("http://localhost:3001/api/data");

      // 운영 환경
      process.env.NEXT_PUBLIC_BASE_URL = "https://prod-api.myapp.com";
      const prodURL = new URLDef("/api/data");
      expect(prodURL.getURL()).toBe("https://prod-api.myapp.com/api/data");
    });
  });

  describe("추가된 에러 처리 테스트", () => {
    test("순환 참조 객체 처리", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";

      // 순환 참조 객체도 정상적으로 문자열 변환됨
      const circularObj: any = { name: "test" };
      circularObj.self = circularObj;

      const urlDef = new URLDef("/api/test", circularObj);
      const result = urlDef.getURL();

      // 순환 참조 객체도 정상적으로 처리됨
      expect(result).toContain("name=test");
      expect(result).toContain("self=%5Bobject+Object%5D"); // [object Object]가 URL 인코딩됨
    });

    test("null/undefined 값이 포함된 객체", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";

      const urlDef = new URLDef("/api/users", {
        name: "john",
        age: null,
        active: undefined,
        email: "",
        page: 1,
        status: "active",
      });

      const result = urlDef.getURL();
      // null, undefined, 빈 문자열은 제외되고 유효한 값만 포함
      expect(result).toBe(
        "https://api.example.com/api/users?name=john&page=1&status=active",
      );
      expect(result).not.toContain("age=null");
      expect(result).not.toContain("active=undefined");
      expect(result).not.toContain("email=");
    });

    test("배열에서 null/undefined 값 필터링", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";

      const urlDef = new URLDef("/api/search", [
        ["q", "javascript"],
        ["type", null],
        ["category", undefined],
        ["page", 1],
        ["sort", "date"],
      ]);

      const result = urlDef.getURL();
      expect(result).toBe(
        "https://api.example.com/api/search?q=javascript&page=1&sort=date",
      );
      expect(result).not.toContain("type");
      expect(result).not.toContain("category");
      expect(result).not.toContain("ignored");
    });

    test("배열 값을 가진 파라미터 처리", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";

      const searchParamsArray: Array<[string, string[] | string]> = [
        ["categories", ["tech", "programming", "javascript"]],
        ["tags", ["react", "typescript"]],
        ["single", "value"],
        ["empty_array", []],
        ["with_nulls", ["valid", "another"]],
      ];

      const urlDef = new URLDef("/api/search", searchParamsArray);
      const result = urlDef.getURL();

      // 배열 값들이 같은 키로 여러 번 추가되어야 함
      expect(result).toContain("categories=tech");
      expect(result).toContain("categories=programming");
      expect(result).toContain("categories=javascript");
      expect(result).toContain("tags=react");
      expect(result).toContain("tags=typescript");
      expect(result).toContain("single=value");

      // 유효한 값들만 추가
      expect(result).toContain("with_nulls=valid");
      expect(result).toContain("with_nulls=another");

      // 빈 배열은 아무것도 추가하지 않음
      expect(result).not.toContain("empty_array");
    });

    test("falsy 값들 중 유효한 값은 유지", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";

      const urlDef = new URLDef("/api/data", {
        zero: 0,
        false_value: false,
        empty_string: "", // 이건 제외됨
        null_value: null, // 이건 제외됨
        undefined_value: undefined, // 이건 제외됨
        normal: "value",
      });

      const result = urlDef.getURL();
      // 0과 false는 유효한 값이므로 포함, null/undefined/빈문자열은 제외
      expect(result).toBe(
        "https://api.example.com/api/data?zero=0&false_value=false&normal=value",
      );
      expect(result).toContain("zero=0");
      expect(result).toContain("false_value=false");
      expect(result).toContain("normal=value");
      expect(result).not.toContain("empty_string");
      expect(result).not.toContain("null_value");
      expect(result).not.toContain("undefined_value");
    });

    test("복잡한 API 시나리오", () => {
      process.env.NEXT_PUBLIC_BASE_URL = "https://api.example.com";

      const baseAPI = "/api/posts";

      // 검색 API
      const searchURL = new URLDef(baseAPI, { q: "javascript", page: 1 });
      expect(searchURL.getURL()).toBe(
        "https://api.example.com/api/posts?q=javascript&page=1",
      );

      // 필터링 API
      const filterURL = new URLDef(baseAPI, {
        category: "tech",
        sort: "date",
        limit: 20,
      });
      expect(filterURL.getURL()).toBe(
        "https://api.example.com/api/posts?category=tech&sort=date&limit=20",
      );
    });

    test("환경별 URL 검증", () => {
      // 개발 환경
      process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3001";
      const devAPI = new URLDef("/api/health");
      expect(devAPI.getURL()).toBe("http://localhost:3001/api/health");

      // 운영 환경
      process.env.NEXT_PUBLIC_BASE_URL = "https://prod-api.example.com";
      const prodAPI = new URLDef("/api/health");
      expect(prodAPI.getURL()).toBe("https://prod-api.example.com/api/health");

      // baseURL 없는 환경
      delete process.env.NEXT_PUBLIC_BASE_URL;
      const localAPI = new URLDef("/api/health");
      expect(localAPI.getURL()).toBe("/api/health");
    });
  });
});
