"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_CODE_TO_EMOJI } from "@/shared/constants";
import type { CategoryCode } from "@/shared/types";

export const CategoryList = <
  T extends { code: string | number; value: string },
>({
  categories,
  currentCategoryCode,
  handleClick,
}: {
  categories: T[];
  currentCategoryCode: string | number;
  handleClick: (code: string | number) => void;
}) => {
  return (
    <div className="flex justify-center lg:block">
      <ul className="flex flex-row flex-wrap justify-center gap-8 lg:flex-col lg:gap-2">
        {categories.map((category) => {
          const emoji = CATEGORY_CODE_TO_EMOJI[category.code as CategoryCode];
          return (
            <li
              key={category.code}
              className={cn(
                "flex min-w-fit items-center gap-1 rounded-sm border-1 border-transparent px-16 py-12",
                "hover:border-blue2 lg:hover:border-gray2 hover:cursor-pointer",
                "px-12 py-8 lg:px-16 lg:py-12",
                currentCategoryCode == category.code
                  ? "bg-blue2 lg:bg-gray2 text-gray10 font-sub6 lg:font-sub5"
                  : "bg-gray2 text-gray6 font-body6 lg:font-body4 lg:bg-transparent",
              )}
              onClick={() => {
                handleClick(category.code);
              }}
            >
              <span className="block lg:hidden">{emoji}</span>
              <span>{category.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
