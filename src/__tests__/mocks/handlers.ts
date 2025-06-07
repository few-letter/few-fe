import { http, HttpResponse } from "msw";

// API 엔드포인트에 대한 모의 응답을 정의합니다
export const handlers = [
  // GET 요청 예시
  http.get("/api/example", () => {
    return HttpResponse.json({
      message: "This is a mocked response",
      data: {
        id: 1,
        name: "Example Data",
      },
    });
  }),

  // POST 요청 예시
  http.post("/api/example", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      message: "Data received",
      data: body,
    });
  }),
];
