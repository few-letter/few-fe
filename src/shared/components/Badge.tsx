import { cn } from "@/lib/utils";
import { CATEGORY_CODE_TO_COLOR } from "@/shared/constants";

import type { CategoryCode, CodeValueResponse } from "@/shared/types";

interface BadgeProps {
  categoryCode: CategoryCode;
  categories: CodeValueResponse[];
  className?: string;
}

export const Badge = ({ categoryCode, categories, className }: BadgeProps) => {
  const color = CATEGORY_CODE_TO_COLOR[categoryCode];
  const label = categories.find(
    (category) => category.code === categoryCode,
  )?.value;

  return (
    <div
      className={cn(
        "text-gray8",
        `${color} font-caption2 w-fit rounded-sm bg-white px-8 py-4`,
        className,
      )}
    >
      {label}
    </div>
  );
};
