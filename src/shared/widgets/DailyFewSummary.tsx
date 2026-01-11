"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

import { CategoryList } from "@/shared/components";
import { CLIENT_ROUTES } from "@/shared/constants";
import { MIXPANEL_EVENT } from "@/shared/constants";
import { useMixpanel } from "@/shared/providers";
import { useCategories, usePathToWorld } from "@/shared/hooks";
import { DailyContentList } from "@/shared/widgets/DailyContentList";
import { SubscribeLottie } from "./SubscribeLottie";

export const DailyFewSummary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mixpanel = useMixpanel();
  const world = usePathToWorld();
  const categories = useCategories(world);
  const selectedCategory = searchParams.get("category") || "all";
  const totalCategories = useMemo(
    () => [{ code: "all", value: "전체" }, ...categories],
    [categories],
  );

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
              onClick={() =>
                mixpanel?.track(MIXPANEL_EVENT.HOME_MAIN_SUBSCRIBE_CLICK)
              }
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
