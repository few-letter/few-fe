import { cn } from "@/lib/utils";
import Link from "next/link";

import { Badge } from "@/shared/components";
import { formatDateToYYYYMMDD } from "@/shared/utils";

import type { CategoryCode, CodeValueResponse } from "@/shared/types";

interface CardProps {
  categories: CodeValueResponse[];
  categoryCode: CategoryCode;
  link: string;
  headline: string;
  summary: string;
  createdAt: Date;
  image?: string;
}

export const Card = ({
  categories,
  categoryCode,
  link,
  headline,
  summary,
  createdAt,
  image,
}: CardProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      className={cn(
        "group border-gray2 relative flex flex-col overflow-hidden rounded-sm border-1",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-white opacity-0 transition-opacity duration-200",
          "group-hover:opacity-40",
        )}
      />
      <div
        className={cn(
          "relative flex min-h-160 min-w-282",
          "bg-opacity70 bg-cover bg-center bg-no-repeat",
        )}
        style={{ backgroundImage: image ? `url(${image})` : "none" }}
      />
      <div className="bg-gray2 flex w-full flex-1 flex-col justify-between px-20 py-20">
        <div className="space-y-12">
          <Badge categoryCode={categoryCode} categories={categories} />
          <div className="font-sub2 text-gray9 line-clamp-2">{headline}</div>
          <p className="font-body6 text-gray7 line-clamp-3">{summary}</p>
          <p className="font-body6 text-gray7">
            {formatDateToYYYYMMDD(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="border-gray2 flex flex-col overflow-hidden rounded-sm border-1">
      <div className="bg-gray3 h-412 animate-pulse rounded-sm"></div>
    </div>
  );
};
