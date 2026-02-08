"use client";

import { cn } from "@/lib/utils";
import {
  CATEGORY_CODE_TO_COLOR,
  CATEGORY_CODE_TO_EMOJI,
} from "@/shared/constants";
import { useCategories, usePathToWorld } from "@/shared/hooks";

import type { CategoryCode } from "@/shared/types";

interface BadgeProps {
  categoryCode: CategoryCode;
  className?: string;
  showEmoji?: boolean;
  variant?: "primary" | "secondary";
}

const variantStyles = {
  primary: "bg-white",
  secondary: "bg-gray2",
};

export const Badge = ({
  categoryCode,
  className,
  showEmoji = false,
  variant = "primary",
}: BadgeProps) => {
  const world = usePathToWorld();
  const categories = useCategories(world);
  const color = CATEGORY_CODE_TO_COLOR[categoryCode];
  const emoji = CATEGORY_CODE_TO_EMOJI[categoryCode];
  const label =
    categories.find((category) => category.code === categoryCode)?.value ?? "";

  return (
    <div
      className={cn(
        "text-gray8 font-caption2 w-fit rounded-sm px-8 py-4",
        color,
        variantStyles[variant],
        className,
      )}
    >
      {showEmoji && emoji && `${emoji} `}
      {label}
    </div>
  );
};
