"use client";

import { Carousel, NewsCard } from "@/shared/components";
import { useGroups } from "@/shared/hooks";

export const DailyFewSection = () => {
  const groups = useGroups("local");

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
