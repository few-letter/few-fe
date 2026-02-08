import { cn } from "@/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const orientationStyles = {
  horizontal: "w-full h-1",
  vertical: "w-1 h-16",
};

export const Divider = ({
  orientation = "vertical",
  className,
}: DividerProps) => {
  return (
    <div className={cn("bg-gray3", orientationStyles[orientation], className)} />
  );
};
