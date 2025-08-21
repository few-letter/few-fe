import { HIGHLIGHT_MATCH_SENSITIVITY } from "@/shared/constants";
import { findHighlightMatches } from "@/shared/utils";

export const HighlightedText = ({
  text,
  highlightTexts,
}: {
  text: string;
  highlightTexts: string[];
}) => {
  const matches = findHighlightMatches(
    text,
    highlightTexts,
    HIGHLIGHT_MATCH_SENSITIVITY,
  );

  if (matches.length === 0) {
    return <span>{text}</span>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    if (match.start > lastIndex) {
      parts.push(text.slice(lastIndex, match.start));
    }

    parts.push(
      <span key={index} className="bg-news-highlight rounded px-1">
        {text.slice(match.start, match.end)}
      </span>,
    );

    lastIndex = match.end;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
};
