"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { CategoryList } from "@/shared/components";
import { CLIENT_ROUTES } from "@/shared/constants";
import { DailyContentList } from "@/shared/widgets/DailyContentList";
import { SubscribeLottie } from "./SubscribeLottie";
import { useCategories } from "@/shared/hooks";

export const DailyFewSummary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = useCategories();
  const selectedCategory = searchParams.get("category") || "all";
  const totalCategories = [{ code: "all", value: "전체" }, ...categories];

  return (
    <>
      <div className="text-gray9 font-heading3 pt-40 pb-16 text-center lg:pb-24 lg:text-left">
        한줄 요약 few.
      </div>
      <div className="flex flex-col gap-40 lg:flex-row lg:gap-24">
        <nav className="flex flex-col gap-40">
          <div className="bg-gray2 relative hidden h-160 w-282 rounded-sm p-16 lg:flex lg:flex-col lg:items-center lg:justify-end">
            <SubscribeLottie className="absolute top-0 left-0" />
            <Link
              href={CLIENT_ROUTES.SUBSCRIPTION}
              className="hover:bg-gray10 absolute w-250 rounded-sm bg-black py-8 text-center hover:cursor-pointer"
            >
              <span className="font-body3 text-white">
                보고싶은 뉴스 카테고리
              </span>
              <span className="font-body3 text-blue3"> 무료 구독</span>
            </Link>
          </div>
          <CategoryList
            categories={totalCategories}
            currentCategoryCode={selectedCategory}
            handleClick={(code: string | number) => {
              router.push(`?category=${code}`, { scroll: false });
            }}
          />
        </nav>
        <article className="w-full">
          <DailyContentList category={selectedCategory} />
        </article>
      </div>
    </>
  );
};
