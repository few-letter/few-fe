import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton = ({
  icon,
  label,
  onClick,
  className,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-gray2 font-body5 text-gray8 hover:bg-gray3 flex cursor-pointer items-center gap-4 rounded-sm px-8 py-4",
        className,
      )}
    >
      {icon}
      {label}
    </button>
  );
};
