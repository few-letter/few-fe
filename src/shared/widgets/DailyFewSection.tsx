"use client";

import { Carousel, NewsCard } from "@/shared/components";
import { useGroups } from "@/shared/hooks";

interface DailyFewSectionProps {
  date: string;
}

export const DailyFewSection = ({ date }: DailyFewSectionProps) => {
  const groups = useGroups(date);

  return (
    <Carousel
      items={groups}
      renderItem={(item) => (
        <NewsCard
          highlightTexts={item.highlightTexts}
          categoryCode={item.category}
          headline={item.headline}
          summary={item.summary}
          relatedNews={item.groupSourceHeadlines}
        />
      )}
      numColumns={2}
    />
  );
};
