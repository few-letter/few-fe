"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { INDICATOR_TOTAL_WIDTH, MIN_SWIPE_DISTANCE } from "@/shared/constants";

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

  // 터치 제스처를 위한 상태
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  // 터치 이벤트 핸들러들
  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setTouchEnd(null);
    if ("targetTouches" in e) {
      setTouchStart(e.targetTouches[0].clientX);
    } else {
      setTouchStart(e.clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if ("targetTouches" in e) {
      setTouchEnd(e.targetTouches[0].clientX);
    } else {
      setTouchEnd(e.clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className="overflow-hidden"
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
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
          <div className="hidden flex-row gap-12 md:flex">
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
        {/* 인디케이터 - 768px 미만 */}
        <div className="flex flex-row gap-4 md:hidden">
          {Array.from({ length: totalSlides }).map((_, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "bg-gray3 h-6 w-6 rounded-full",
                  currentIndex === index && "bg-gray10",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
