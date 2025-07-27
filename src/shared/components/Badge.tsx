import { cn } from "@/lib/utils";

const BADGE_CONFIG = {
  TECH: {
    color: "text-badge-purple",
    label: "기술",
  },
  BUSINESS: {
    color: "text-badge-yellow",
    label: "비지니스",
  },
  APPLE: {
    color: "text-badge-pink",
    label: "애플",
  },
  ECONOMY: {
    color: "text-badge-blue",
    label: "경제",
  },
  ELECTROIC_CAR: {
    color: "text-badge-red",
    label: "전기차",
  },
  POLITICS: {
    color: "text-badge-green",
    label: "정치",
  },
} as const;

export type Category = keyof typeof BADGE_CONFIG;

interface BadgeProps {
  category: Category;
  className?: string;
}

export const Badge = ({ category, className }: BadgeProps) => {
  return (
    <div
      className={cn(
        `${BADGE_CONFIG[category].color} font-caption2 w-fit rounded-sm bg-white px-8 py-4`,
        className,
      )}
    >
      {BADGE_CONFIG[category].label}
    </div>
  );
};
