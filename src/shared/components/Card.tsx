import { cn } from "@/lib/utils";

import { Badge } from "./Badge";
import { toKoreanSlashDate } from "@/shared/utils";
import Link from "next/link";

import type { CategoryCode, CodeValueResponse } from "@/shared/types";

interface CardProps {
  categoryCode: CategoryCode;
  link: string;
  headline: string;
  summary: string;
  createdAt: Date | string;
  image?: string;
  mediaType: CodeValueResponse;
}

export const Card = ({
  categoryCode,
  link,
  headline,
  summary,
  createdAt,
  image,
  mediaType,
}: CardProps) => {
  const isWebView =
    typeof window !== "undefined" && /WebView|wv/.test(navigator.userAgent);

  return (
    <Link
      href={link}
      {...(!isWebView && { target: "_blank", rel: "noreferrer noopener" })}
      className={cn(
        "group border-gray2 relative flex flex-col overflow-hidden rounded-sm",
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
      <div className="bg-gray2 flex w-full flex-1 px-20 py-20">
        <div className="flex flex-1 flex-col gap-12">
          <Badge categoryCode={categoryCode} />
          <div className="space-y-8">
            <div className="font-sub2 text-gray9 line-clamp-2">{headline}</div>
            <div className="font-body6 text-gray7 line-clamp-5 sm:line-clamp-4">
              {summary}
            </div>
            <div className="font-body6 text-gray7">
              <span>{toKoreanSlashDate(createdAt)}</span>
              <span> · </span>
              <span>{mediaType.value}</span>
            </div>
          </div>
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
