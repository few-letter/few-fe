import {
  calculateSimilarity,
  findHighlightMatches,
  validateEmail,
} from "../util";

describe("calculateSimilarity", () => {
  describe("동일한 문자열", () => {
    it("완전히 동일한 문자열은 유사도 1을 반환한다", () => {
      expect(calculateSimilarity("안녕하세요", "안녕하세요")).toBe(1);
      expect(calculateSimilarity("오늘의 날씨", "오늘의 날씨")).toBe(1);
    });

    it("빈 문자열끼리 비교하면 유사도 1을 반환한다", () => {
      expect(calculateSimilarity("", "")).toBe(1);
    });
  });

  describe("완전히 다른 문자열", () => {
    it("길이가 같은 완전히 다른 문자열은 유사도 0을 반환한다", () => {
      expect(calculateSimilarity("가나다", "라마바")).toBe(0);
    });

    it("한쪽이 빈 문자열이면 유사도 0을 반환한다", () => {
      expect(calculateSimilarity("", "안녕")).toBe(0);
      expect(calculateSimilarity("안녕", "")).toBe(0);
    });
  });

  describe("부분적으로 유사한 문자열", () => {
    it("같은 글자 수가 증가할수록 유사도가 점점 높아진다", () => {
      const base = "오늘의 날씨";

      const similarity1 = calculateSimilarity(base, "오라마바사"); // 1글자 같음
      const similarity2 = calculateSimilarity(base, "오늘마바사"); // 2글자 같음
      const similarity3 = calculateSimilarity(base, "오늘의바사"); // 3글자 같음
      const similarity4 = calculateSimilarity(base, "오늘의 바사"); // 4글자 같음
      const similarity5 = calculateSimilarity(base, "오늘의 날아"); // 5글자 같음
      const similarity6 = calculateSimilarity(base, "오늘의 날씨"); // 6글자 같음

      expect(similarity1).toBeLessThan(similarity2);
      expect(similarity2).toBeLessThan(similarity3);
      expect(similarity3).toBeLessThan(similarity4);
      expect(similarity4).toBeLessThan(similarity5);
      expect(similarity5).toBeLessThan(similarity6);

      expect(similarity6).toBe(1);
    });
  });

  describe("대소문자 처리", () => {
    it("대소문자가 달라도 같은 문자로 취급한다", () => {
      const similarity = calculateSimilarity("Hello", "hello");
      expect(similarity).toBe(1);
    });

    it("대소문자 혼합 문자열도 정확하게 비교한다", () => {
      expect(calculateSimilarity("HELLO WORLD", "hello world")).toBe(1);
      expect(calculateSimilarity("TeSt", "test")).toBe(1);
    });
  });

  describe("길이가 다른 문자열", () => {
    it("길이가 다른 문자열의 유사도를 계산한다", () => {
      const similarity = calculateSimilarity("안녕", "안녕하세요");
      expect(similarity).toBeGreaterThan(0);
      expect(similarity).toBeLessThan(1);
    });
  });
});

describe("findHighlightMatches", () => {
  describe("정확한 매칭", () => {
    it("정확히 일치하는 텍스트를 찾는다", () => {
      const text = "이것은 테스트 문장입니다.";
      const matches = findHighlightMatches(text, ["테스트"]);

      expect(matches).toHaveLength(1);
      expect(matches[0]).toEqual({
        start: 4,
        end: 7,
        text: "테스트",
        similarity: 1.0,
      });
    });

    it("여러 개의 정확한 매칭을 찾는다", () => {
      const text = "안녕하세요 세상, 안녕하세요 우주";
      const matches = findHighlightMatches(text, ["안녕하세요"]);

      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].text).toBe("안녕하세요");
      expect(matches[0].similarity).toBe(1.0);
    });
  });

  describe("유사도 매칭", () => {
    it("유사한 문장을 찾는다", () => {
      const text =
        "이것은 테스트입니다. 이것도 테스트입니다. 마지막 문장입니다.";
      const matches = findHighlightMatches(text, ["이것은 테스트예요"], 0.7);

      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].similarity).toBeGreaterThanOrEqual(0.7);
    });

    it("낮은 유사도는 제외한다", () => {
      const text = "완전히 다른 내용이 있습니다.";
      const matches = findHighlightMatches(text, ["매칭되지 않음"], 0.8);

      expect(matches).toHaveLength(0);
    });
  });

  describe("검색 민감도", () => {
    it("기본 민감도는 0.6이다", () => {
      const text = "이것은 테스트 문장입니다.";
      const matchesDefault = findHighlightMatches(text, ["문장입니다"]);
      const matchesExplicit = findHighlightMatches(text, ["문장입니다"], 0.6);

      expect(matchesDefault).toEqual(matchesExplicit);
    });

    it("높은 민감도는 더 엄격하게 매칭한다", () => {
      const text = "안녕하세요 세상. 반갑습니다.";
      const highSensitivity = findHighlightMatches(text, ["안녕하세요"], 0.9);
      const lowSensitivity = findHighlightMatches(text, ["안녕하세요"], 0.5);

      expect(highSensitivity.length).toBeLessThanOrEqual(lowSensitivity.length);
    });
  });

  describe("특수 입력 처리", () => {
    it("빈 하이라이트 배열은 빈 결과를 반환한다", () => {
      const text = "이것은 테스트입니다.";
      const matches = findHighlightMatches(text, []);

      expect(matches).toHaveLength(0);
    });

    it("빈 문자열은 무시한다", () => {
      const text = "이것은 테스트입니다.";
      const matches = findHighlightMatches(text, ["", "  ", "테스트"]);

      expect(matches.length).toBeGreaterThan(0);
      expect(matches.every((m) => m.text !== "")).toBe(true);
    });

    it("따옴표를 제거한다", () => {
      const text = "이것은 테스트 문장입니다.";
      const matches = findHighlightMatches(text, ['"테스트"', "'테스트'"]);

      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].text).toBe("테스트");
    });
  });

  describe("결과 정렬", () => {
    it("매칭 결과는 위치순으로 정렬된다", () => {
      const text = "첫 번째 매칭. 두 번째 매칭. 세 번째 매칭.";
      const matches = findHighlightMatches(text, ["매칭"], 0.6);

      for (let i = 0; i < matches.length - 1; i++) {
        expect(matches[i].start).toBeLessThan(matches[i + 1].start);
      }
    });
  });

  describe("실제 뉴스 텍스트 매칭", () => {
    it("긴 텍스트에서 유사한 부분 문자열을 찾는다", () => {
      const text =
        "배달의민족의 '한 그릇배달' 서비스가 출시 4개월 만에 1천만 건을 돌파하며 1인 가구 수요를 겨냥하고 있지만, 점주들은 낮은 단가와 배달비 부담으로 불만을 토로하고 있습니다. 한편, 공정위 하도급 센터는 중소업체로부터 304억 원을 회수하며 대금 지급을 유도하고 있으며, 서울 외환시장에서 원/달러 환율이 1400원대로 복귀해 달러 강세와 투자 불확실성이 영향을 미치고 있습니다.";

      const highlightTexts = [
        "배달의민족의 '한 그릇배달' 서비스가 출시 4개월 만에 1천만 건을 돌파했다.",
        "점주들은 낮은 단가와 배달비 부담으로 불만을 토로하고 있다.",
        "공정위 하도급 센터는 중소업체로부터 304억 원을 회수하고 있다.",
        "서울 외환시장에서 원/달러 환율이 1400원대로 복귀했다.",
      ];

      const matches = findHighlightMatches(text, highlightTexts, 0.6);

      // 4개의 매칭이 발견되어야 함
      expect(matches.length).toBeGreaterThanOrEqual(4);

      // 첫 번째 매칭: "배달의민족의 '한 그릇배달' 서비스가 출시 4개월 만에 1천만 건을 돌파"
      expect(matches[0].text).toEqual(
        "배달의민족의 '한 그릇배달' 서비스가 출시 4개월 만에 1천만 건을 돌파",
      );
      expect(matches[0].text).not.toContain("하며");

      // 두 번째 매칭: "점주들은 낮은 단가와 배달비 부담으로 불만을 토로하고"
      expect(matches[1].text).toEqual(
        "점주들은 낮은 단가와 배달비 부담으로 불만을 토로하고",
      );

      // 세 번째 매칭: "공정위 하도급 센터는 중소업체로부터 304억 원을 회수"
      expect(matches[2].text).toEqual(
        "공정위 하도급 센터는 중소업체로부터 304억 원을 회수하",
      );

      // 네 번째 매칭: "서울 외환시장에서 원/달러 환율이 1400원대로 복귀"
      expect(matches[3].text).toEqual(
        "서울 외환시장에서 원/달러 환율이 1400원대로 복귀",
      );
      expect(matches[3].text).not.toContain("해");
    });
  });
});

describe("validateEmail", () => {
  describe("유효한 이메일", () => {
    it("표준 이메일 형식을 검증한다", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@example.co.kr")).toBe(true);
      expect(validateEmail("user+tag@example.com")).toBe(true);
    });
  });

  describe("유효하지 않은 이메일", () => {
    it("@ 기호가 없는 이메일을 거부한다", () => {
      expect(validateEmail("invalidemail.com")).toBe(false);
    });

    it("도메인이 없는 이메일을 거부한다", () => {
      expect(validateEmail("user@")).toBe(false);
    });

    it("로컬 파트가 없는 이메일을 거부한다", () => {
      expect(validateEmail("@example.com")).toBe(false);
    });

    it("공백이 포함된 이메일을 거부한다", () => {
      expect(validateEmail("user name@example.com")).toBe(false);
    });

    it("여러 @ 기호가 있는 이메일을 거부한다", () => {
      expect(validateEmail("user@@example.com")).toBe(false);
    });

    it("빈 문자열을 거부한다", () => {
      expect(validateEmail("")).toBe(false);
    });

    it("최상위 도메인이 없는 이메일을 거부한다", () => {
      expect(validateEmail("user@example")).toBe(false);
    });
  });
});
