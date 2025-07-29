"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { INDICATOR_TOTAL_WIDTH, MIN_SWIPE_DISTANCE } from "@/shared/constants";

import { ArrowButton } from "./ArrowButton";

import type { TouchEvent, MouseEvent } from "react";

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
  const [lastSlideOffset, setLastSlideOffset] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = Math.ceil(items.length / itemsPerView);
  const indicatorWidth = Math.round(INDICATOR_TOTAL_WIDTH / totalSlides);

  useEffect(() => {
    const updateItemsPerView = () => {
      const isDesktop = window.innerWidth >= 768;
      setIsDesktop(isDesktop);

      if (isDesktop) {
        setItemsPerView(numColumns);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [numColumns]);

  useEffect(() => {
    const residue = items.length % itemsPerView;
    const newTotalSlides = Math.ceil(items.length / itemsPerView);

    if (currentIndex >= newTotalSlides) {
      setCurrentIndex(newTotalSlides - 1);
    }
    if (residue > 0) {
      setLastSlideOffset((residue / itemsPerView) * 100);
    }
  }, [items.length, itemsPerView, currentIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  const onTouchStart = useCallback((e: TouchEvent | MouseEvent) => {
    setTouchEnd(null);

    if ("targetTouches" in e) {
      setTouchStart(e.targetTouches[0].clientX);
    } else {
      setTouchStart(e.clientX);
    }
  }, []);

  const onTouchMove = useCallback((e: TouchEvent | MouseEvent) => {
    if ("targetTouches" in e) {
      setTouchEnd(e.targetTouches[0].clientX);
    } else {
      setTouchEnd(e.clientX);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
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
  }, [goToNext, goToPrevious, touchStart, touchEnd]);

  const transformStyle = useMemo(() => {
    const validIndex = Math.min(currentIndex, totalSlides - 1);
    const isLastSlideOffsetExist =
      isDesktop && validIndex === totalSlides - 1 && lastSlideOffset > 0;
    const translateX = isLastSlideOffsetExist
      ? -((validIndex - 1) * 100 + lastSlideOffset)
      : -(validIndex * 100);

    return {
      transform: `translateX(${translateX}%)`,
      transition: "transform 0.3s ease-in-out",
    };
  }, [currentIndex, totalSlides, isDesktop, lastSlideOffset]);

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
        <div
          className={cn("flex flex-row flex-nowrap", isDesktop && "gap-24")}
          style={{
            ...transformStyle,
          }}
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={cn("w-full min-w-0 flex-shrink-0")}
                style={{
                  width: `calc(${100 / itemsPerView}% - ${
                    isDesktop ? "24px" : "0px"
                  })`,
                }}
              >
                {item && renderItem(item, index)}
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
              <button
                onClick={() => setCurrentIndex(index)}
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
