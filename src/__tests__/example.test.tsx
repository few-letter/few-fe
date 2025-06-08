import { render, screen } from "@testing-library/react";

describe("기본 테스트", () => {
  it("테스트가 정상적으로 동작하는지 확인", () => {
    expect(true).toBe(true);
  });

  it("문자열 렌더링 테스트", () => {
    render(<div>테스트 컴포넌트</div>);
    expect(screen.getByText("테스트 컴포넌트")).toBeInTheDocument();
  });
});
