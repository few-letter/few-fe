"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { INDICATOR_TOTAL_WIDTH } from "@/shared/constants";

import { ArrowButton } from "./ArrowButton";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  numColumns?: number;
}

export const Carousel = <T,>({
  items,
  renderItem,
  className,
  numColumns = 2,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(numColumns);
  const [isDesktop, setIsDesktop] = useState(false);

  const totalSlides = Math.ceil(items.length / itemsPerView);
  const indicatorWidth = Math.round(INDICATOR_TOTAL_WIDTH / totalSlides);

  useEffect(() => {
    const updateItemsPerView = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (desktop) {
        setItemsPerView(numColumns);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [numColumns]);

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerView;
    const endIndex = startIndex + itemsPerView;
    const currentItems = items.slice(startIndex, endIndex);
    return currentItems;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden">
        <div className="flex flex-col gap-24 md:flex-row">
          {getCurrentItems().map((item, index) => {
            return (
              <div
                key={currentIndex * itemsPerView + index}
                className="w-full min-w-0"
              >
                {item && renderItem(item, currentIndex * itemsPerView + index)}
              </div>
            );
          })}
        </div>
      </div>
      {/* 인디케이터 - 768px 이상 */}
      <div className="mt-24 flex w-full flex-row items-center justify-center gap-24">
        <div
          className={`bg-gray2 relative hidden h-2 justify-center rounded-xl md:flex`}
          style={{ width: `${INDICATOR_TOTAL_WIDTH}px` }}
        >
          {/** 현재 페이지 위치 표기 */}
          <div
            className={`bg-gray10 absolute h-2 rounded-xl transition-all duration-300`}
            style={{
              width: `${indicatorWidth}px`,
              left: `${currentIndex * indicatorWidth}px`,
            }}
          />
        </div>
        {totalSlides > 1 && (
          <div className="flex flex-row gap-12">
            <ArrowButton
              disabled={currentIndex === 0}
              direction="left"
              size={24}
              aria-label="이전 슬라이드"
              onClick={goToPrevious}
            />
            <ArrowButton
              disabled={currentIndex === totalSlides - 1}
              direction="right"
              size={24}
              aria-label="다음 슬라이드"
              onClick={goToNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};
