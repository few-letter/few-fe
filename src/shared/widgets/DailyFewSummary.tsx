"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryList } from "@/shared/components/CategoryList";

import type { CodeValueResponse } from "@/shared/types";

export const DailyFewSummary = ({
  categories,
}: {
  categories: CodeValueResponse[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  const totalCategories = [{ code: "all", value: "전체" }, ...categories];
  return (
    <>
      <div className="text-gray9 font-heading3 pt-40 pb-16 text-center lg:pb-24 lg:text-left">
        한줄 요약 few.
      </div>
      <div className="flex flex-col gap-40 lg:flex-row lg:gap-24">
        <nav className="flex flex-col gap-40">
          <div className="bg-gray2 hidden h-160 w-282 rounded-sm p-16 lg:flex lg:flex-col lg:items-center lg:justify-end">
            <button className="w-250 rounded-sm bg-black py-8 text-center hover:cursor-pointer">
              <span className="font-heading4 font-body4 text-blue3">
                보고싶은 뉴스 카테고리 무료 구독
              </span>
            </button>
          </div>
          <CategoryList
            categories={totalCategories}
            currentCategoryCode={selectedCategory}
            handleClick={(code) => {
              router.push(`?category=${code}`, { scroll: false });
            }}
          />
        </nav>
        <article className="w-full">
          <div className="bg-gray2 h-14 w-full"></div>
        </article>
      </div>
    </>
  );
};
