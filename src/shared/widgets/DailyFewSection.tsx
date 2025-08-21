"use client";

import { Carousel, NewsCard } from "@/shared/components";

import type { BrowseGroupGenResponse, CodeValueResponse } from "@/shared/types";

export const DailyFewSection = ({
  news,
  categories,
}: {
  news: BrowseGroupGenResponse[];
  categories: CodeValueResponse[];
}) => {
  return (
    <Carousel
      items={news}
      renderItem={(item) => (
        <NewsCard
          highlightTexts={item.highlightTexts}
          categories={categories}
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
