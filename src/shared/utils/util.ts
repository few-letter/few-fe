/**
 * Levenshtein Distance 기반
 * @param str1 - 비교할 문자열 1
 * @param str2 - 비교할 문자열 2
 * @returns 유사도 (0-1)
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  // 대소문자를 무시하고 비교
  const normalizedStr1 = str1.toLowerCase();
  const normalizedStr2 = str2.toLowerCase();

  const len1 = normalizedStr1.length;
  const len2 = normalizedStr2.length;

  if (len1 === 0) return len2 === 0 ? 1 : 0;
  if (len2 === 0) return 0;

  const matrix = Array(len2 + 1)
    .fill(null)
    .map(() => Array(len1 + 1).fill(null));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const cost = normalizedStr1[i - 1] === normalizedStr2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost,
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return 1 - matrix[len2][len1] / maxLen;
};

/**
 * 문자열에서 하이라이트할 부분을 찾는 함수
 * @param text - 비교할 문자열
 * @param highlightTexts - 하이라이트할 텍스트
 * @param searchSensitivity - 유사도 검색 감도
 * @returns 하이라이트 정보 배열
 */

interface HighlightedTextInfo {
  start: number;
  end: number;
  text: string;
  similarity: number;
}

const WINDOW_SIZE_MIN_RATIO = 0.5;
const WINDOW_SIZE_MAX_RATIO = 1.5;
const WINDOW_SIZE_STEP = 5;
const WINDOW_POSITION_STEP = 3;
const EARLY_EXIT_SIMILARITY = 0.95;

/**
 * highlightText와 text에서 실제로 공통되는 부분을 추출
 * @param highlightText - 찾고자 하는 텍스트
 * @param text - 전체 텍스트
 * @param startHint - 검색 시작 힌트 위치
 * @returns 정확히 매칭되는 부분의 시작, 끝 위치와 텍스트
 */
const extractExactMatchingPart = (
  highlightText: string,
  text: string,
  startHint: number,
): { start: number; end: number; text: string } | null => {
  // highlightText를 토큰으로 분할 (단어 단위)
  const tokens = highlightText.match(/\S+/g) || [];

  if (tokens.length === 0) return null;

  // 검색 범위 설정
  const searchStart = Math.max(0, startHint - 100);
  const searchEnd = Math.min(
    text.length,
    startHint + highlightText.length + 100,
  );

  // 첫 번째 토큰의 위치 찾기
  let matchStart = -1;
  for (let i = searchStart; i < searchEnd; i++) {
    const substr = text.substring(i, i + (tokens[0]?.length || 0));
    if (substr.toLowerCase() === tokens[0]?.toLowerCase()) {
      matchStart = i;
      break;
    }
  }

  if (matchStart === -1) return null;

  // 토큰들을 순서대로 찾으면서 연속적으로 매칭되는 부분 추출
  let currentPos = matchStart;
  let lastMatchEnd = matchStart + (tokens[0]?.length || 0);

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    const searchLimit = currentPos + 100; // 토큰 간 최대 거리

    // 현재 위치에서 다음 토큰 찾기
    let found = false;
    for (let j = lastMatchEnd; j < Math.min(searchLimit, text.length); j++) {
      const substr = text.substring(j, j + token.length);
      if (substr.toLowerCase() === token.toLowerCase()) {
        currentPos = j;
        lastMatchEnd = j + token.length;
        found = true;
        break;
      }
    }

    // 토큰을 찾지 못한 경우, 부분 매칭 시도
    if (!found) {
      // 토큰의 앞부분이 텍스트와 매칭되는지 확인
      let maxPartialMatch = 0;
      let partialMatchPos = -1;

      for (let j = lastMatchEnd; j < Math.min(searchLimit, text.length); j++) {
        // 토큰의 앞부분과 텍스트가 얼마나 매칭되는지 확인
        let matchLen = 0;
        while (
          matchLen < token.length &&
          j + matchLen < text.length &&
          token[matchLen].toLowerCase() === text[j + matchLen].toLowerCase()
        ) {
          matchLen++;
        }

        // 최소 2글자 또는 토큰 길이의 50% 이상 매칭되면 부분 매칭으로 간주
        const minMatchLen = Math.max(2, Math.floor(token.length * 0.5));
        if (matchLen >= minMatchLen && matchLen > maxPartialMatch) {
          maxPartialMatch = matchLen;
          partialMatchPos = j;
        }
      }

      // 부분 매칭을 찾은 경우
      if (partialMatchPos !== -1) {
        lastMatchEnd = partialMatchPos + maxPartialMatch;
      }
      break;
    }
  }

  // 매칭된 부분의 끝을 단어 경계로 조정
  let matchEnd = lastMatchEnd;
  while (matchEnd > matchStart && /\s/.test(text[matchEnd - 1])) {
    matchEnd--;
  }

  const matchedText = text.substring(matchStart, matchEnd);

  return {
    start: matchStart,
    end: matchEnd,
    text: matchedText,
  };
};

const findHighlightMatches = (
  text: string,
  highlightTexts: string[],
  searchSensitivity: number = 0.6,
): Array<HighlightedTextInfo> => {
  const matches: Array<HighlightedTextInfo & { similarity: number }> = [];

  for (const highlight of highlightTexts) {
    const cleanHighlight = highlight.replace(/['"]/g, "").trim();

    if (!cleanHighlight) continue;

    // 1. 정확 매칭 시도 (대소문자 무시)
    const lowerText = text.toLowerCase();
    const lowerHighlight = cleanHighlight.toLowerCase();
    const exactIndex = lowerText.indexOf(lowerHighlight);

    if (exactIndex !== -1) {
      // 정확 매칭된 경우에도 실제 text에서 공통 부분만 추출
      const exactMatch = extractExactMatchingPart(
        cleanHighlight,
        text,
        exactIndex,
      );

      if (exactMatch) {
        matches.push({
          ...exactMatch,
          similarity: 1.0,
        });
      }
      continue;
    }

    // 2. 문장 단위 매칭 시도
    const sentences = text.split(/[.!?。…,]/);
    let currentIndex = 0;
    let foundInSentence = false;

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();

      if (trimmedSentence.length > 0) {
        const similarity = calculateSimilarity(cleanHighlight, trimmedSentence);

        if (similarity >= searchSensitivity) {
          const sentenceStart = text.indexOf(trimmedSentence, currentIndex);
          if (sentenceStart !== -1) {
            // 문장 매칭된 경우에도 실제 공통 부분만 추출
            const refinedMatch = extractExactMatchingPart(
              cleanHighlight,
              text,
              sentenceStart,
            );

            if (refinedMatch) {
              matches.push({
                ...refinedMatch,
                similarity,
              });
            }
            foundInSentence = true;
            break;
          }
        }
      }

      currentIndex += sentence.length + 1;
    }

    // 3. 슬라이딩 윈도우 방식으로 부분 문자열 매칭
    if (!foundInSentence) {
      const highlightLen = cleanHighlight.length;
      const minWindowSize = Math.floor(highlightLen * WINDOW_SIZE_MIN_RATIO);
      const maxWindowSize = Math.ceil(highlightLen * WINDOW_SIZE_MAX_RATIO);

      let bestMatch: {
        start: number;
        similarity: number;
      } | null = null;

      // 다양한 윈도우 크기로 시도
      windowLoop: for (
        let windowSize = minWindowSize;
        windowSize <= maxWindowSize;
        windowSize += WINDOW_SIZE_STEP
      ) {
        for (
          let i = 0;
          i <= text.length - windowSize;
          i += WINDOW_POSITION_STEP
        ) {
          const window = text.substring(i, i + windowSize);
          const similarity = calculateSimilarity(cleanHighlight, window);

          if (
            similarity >= searchSensitivity &&
            (!bestMatch || similarity > bestMatch.similarity)
          ) {
            bestMatch = {
              start: i,
              similarity,
            };

            // 조기 종료: 충분히 높은 유사도를 찾으면 중단
            if (similarity >= EARLY_EXIT_SIMILARITY) {
              break windowLoop;
            }
          }
        }
      }

      if (bestMatch) {
        // 윈도우 매칭된 경우에도 실제 공통 부분만 추출
        const refinedMatch = extractExactMatchingPart(
          cleanHighlight,
          text,
          bestMatch.start,
        );

        if (refinedMatch) {
          matches.push({
            ...refinedMatch,
            similarity: bestMatch.similarity,
          });
        }
      }
    }
  }

  // 중복 제거: 유사도가 높은 순으로 정렬 후, 겹치는 항목 제거
  matches.sort((a, b) => b.similarity - a.similarity || a.start - b.start);

  const filteredMatches: Array<HighlightedTextInfo> = [];
  for (const match of matches) {
    // 기존 매칭과 겹치지 않는지 확인
    const hasOverlap = filteredMatches.some(
      (existing) =>
        (match.start >= existing.start && match.start < existing.end) ||
        (match.end > existing.start && match.end <= existing.end) ||
        (match.start <= existing.start && match.end >= existing.end),
    );

    if (!hasOverlap) {
      filteredMatches.push(match);
    }
  }

  // 최종적으로 위치순으로 정렬
  filteredMatches.sort((a, b) => a.start - b.start);

  return filteredMatches;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { calculateSimilarity, findHighlightMatches, validateEmail };
