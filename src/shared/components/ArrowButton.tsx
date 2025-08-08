import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ArrowButtonProps {
  direction: "left" | "right";
  size: number;
  disabled?: boolean;
  onClick: () => void;
}

export const ArrowButton = ({
  direction = "left",
  size = 24,
  disabled,
  onClick,
  ...props
}: ArrowButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group flex h-fit w-fit items-center justify-center rounded-full transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "group-hover:bg-gray2 rounded-full transition-transform duration-200",
          "group-disabled:bg-transparent",
          direction === "right" && "rotate-180",
        )}
      >
        <circle
          cx="12"
          cy="12"
          r="11.5"
          className={cn(
            "stroke-gray2 transition-colors duration-200",
            disabled ? "stroke-gray3" : "group-hover:stroke-gray8",
          )}
        />
        <path
          d="M16.4927 11.4926L16.4752 12.5248L8.95436 12.5179L11.8695 15.433L11.1421 16.1421L6.99994 11.9999L11.1344 7.86545L11.8632 8.59424L8.96263 11.4948L16.4927 11.4926Z"
          className={cn(
            "fill-gray8 transition-colors duration-200",
            disabled ? "fill-gray3" : "group-hover:fill-gray8",
          )}
        />
      </svg>
    </button>
  );
};
