import { cn } from "@/lib/utils";
import {
  CATEGORY_CODE_TO_COLOR,
  CATEGORY_CODE_TO_EMOJI,
} from "@/shared/constants";

import type { CategoryCode, CodeValueResponse } from "@/shared/types";

interface BadgeProps {
  categoryCode: CategoryCode;
  categories: CodeValueResponse[];
  className?: string;
  showEmoji?: boolean;
}

export const Badge = ({
  categoryCode,
  categories,
  className,
  showEmoji = false,
}: BadgeProps) => {
  const color = CATEGORY_CODE_TO_COLOR[categoryCode];
  const emoji = CATEGORY_CODE_TO_EMOJI[categoryCode];
  const label =
    categories.find((category) => category.code === categoryCode)?.value ?? "";

  return (
    <div
      className={cn(
        "text-gray8",
        color,
        "font-caption2 w-fit rounded-sm bg-white px-8 py-4",
        className,
      )}
    >
      {showEmoji && emoji && `${emoji} `}
      {label}
    </div>
  );
};
