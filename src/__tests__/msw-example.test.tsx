import { useState, useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../../jest.setup";

// API를 호출하는 간단한 컴포넌트
const ExampleComponent = () => {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/api/example")
      .then((res) => res.json())
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  return <div>{data.message}</div>;
};

describe("MSW Example", () => {
  it("should fetch and display mocked data", async () => {
    // 특정 테스트에서만 다른 응답을 주고 싶을 때
    server.use(
      http.get("/api/example", () => {
        return HttpResponse.json({
          message: "Custom mocked response",
        });
      }),
    );

    render(<ExampleComponent />);

    // 초기 로딩 상태 확인
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // 데이터가 로드된 후 확인
    await waitFor(() => {
      expect(screen.getByText("Custom mocked response")).toBeInTheDocument();
    });
  });
});
