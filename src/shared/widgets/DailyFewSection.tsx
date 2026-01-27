"use client";

import { Carousel, NewsCard } from "@/shared/components";
import { useGroups, usePathToWorld } from "@/shared/hooks";
import { CATEGORY_CODE_TO_IMAGE } from "@/shared/constants";

export const DailyFewSection = () => {
  const world = usePathToWorld();
  const groups = useGroups(world);

  return (
    <Carousel
      items={groups}
      renderItem={(item) => (
        <NewsCard
          id={item.id}
          worldType={world}
          highlightTexts={item.highlightTexts}
          categoryCode={item.category}
          headline={item.headline}
          summary={item.summary}
          relatedNews={item.groupSourceHeadlines}
          image={CATEGORY_CODE_TO_IMAGE[item.category]}
        />
      )}
      numColumns={2}
    />
  );
};
