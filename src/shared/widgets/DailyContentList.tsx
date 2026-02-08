"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { Card, CardSkeleton } from "@/shared/components";
import { getInfiniteContentsOptions } from "@/shared/remotes";
import { usePathToWorld } from "@/shared/hooks";

import type { BrowseContentsResponse } from "@/shared/types";

interface DailyContentsListProps {
  category: string;
}

export const DailyContentList = ({ category }: DailyContentsListProps) => {
  const world = usePathToWorld();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery(getInfiniteContentsOptions(world, category));

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <p className="text-gray6 font-body3 mb-16">
          콘텐츠를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => void refetch()}
          className="bg-blue2 font-body4 hover:bg-blue3 rounded-sm px-16 py-8 text-white transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const allContents: BrowseContentsResponse[] =
    data?.pages.flatMap((page) => page.data.contents) ?? [];

  if (allContents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <p className="text-gray6 font-body3">
          선택한 카테고리에 콘텐츠가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-40">
      <div className="grid gap-24 md:grid-cols-2 lg:grid-cols-3">
        {allContents.map((content, index) => (
          <Card
            key={`${content.id}-${index}`}
            id={content.id}
            worldType={world}
            categoryCode={content.category.code}
            headline={content.headline}
            summary={content.summary}
            image={content.thumbnailImageUrl}
            createdAt={content.createdAt}
            mediaType={content.mediaType}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={observerRef} className="flex justify-center py-24">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-8">
              <div className="border-blue2 h-20 w-20 animate-spin rounded-full border-b-2"></div>
              <span className="text-gray6 font-body4">로딩 중...</span>
            </div>
          ) : (
            <div className="text-gray6 font-body4">
              더 많은 콘텐츠 불러오는 중...
            </div>
          )}
        </div>
      )}
    </div>
  );
};
