/**
 * Levenshtein Distance 기반
 * @param str1 - 비교할 문자열 1
 * @param str2 - 비교할 문자열 2
 * @returns 유사도 (0-1)
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const len1 = str1.length;
  const len2 = str2.length;

  if (len1 === 0) return len2;
  if (len2 === 0) return len1;

  const matrix = Array(len2 + 1)
    .fill(null)
    .map(() => Array(len1 + 1).fill(null));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
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

const findHighlightMatches = (
  text: string,
  highlightTexts: string[],
  searchSensitivity: number = 0.6,
): Array<HighlightedTextInfo> => {
  const matches: Array<HighlightedTextInfo & { similarity: number }> = [];

  for (const highlight of highlightTexts) {
    const cleanHighlight = highlight.replace(/['"]/g, "").trim();

    if (!cleanHighlight) continue;

    const exactIndex = text.indexOf(cleanHighlight);

    if (exactIndex !== -1) {
      matches.push({
        start: exactIndex,
        end: exactIndex + cleanHighlight.length,
        text: cleanHighlight,
        similarity: 1.0,
      });
      continue;
    }

    const sentences = text.split(/[.!?。]/);

    let currentIndex = 0;

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();

      if (trimmedSentence.length > 0) {
        const similarity = calculateSimilarity(cleanHighlight, trimmedSentence);

        if (similarity >= searchSensitivity) {
          const sentenceStart = text.indexOf(trimmedSentence, currentIndex);
          if (sentenceStart !== -1) {
            matches.push({
              start: sentenceStart,
              end: sentenceStart + trimmedSentence.length,
              text: trimmedSentence,
              similarity,
            });
          }
        }
      }

      currentIndex += sentence.length + 1;
    }
  }

  const sortedMatches = matches
    .sort((a, b) => b.similarity - a.similarity || a.start - b.start)
    .filter((match, index, arr) => {
      return !arr
        .slice(0, index)
        .some(
          (prevMatch) =>
            (match.start >= prevMatch.start && match.start < prevMatch.end) ||
            (match.end > prevMatch.start && match.end <= prevMatch.end),
        );
    })
    .sort((a, b) => a.start - b.start);

  return sortedMatches;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { calculateSimilarity, findHighlightMatches, validateEmail };
