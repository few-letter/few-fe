import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Badge } from "./Badge";
import { HighlightedText } from "./HighlightedText";

import { CLIENT_ROUTES } from "@/shared/constants";
import type { GroupSourceHeadlineData, CategoryCode } from "@/shared/types";

interface NewsCardProps {
  id: number;
  categoryCode: CategoryCode;
  headline: string;
  summary: string;
  highlightTexts: string[];
  relatedNews: GroupSourceHeadlineData[];
  image?: string | null;
}

export const NewsCard = ({
  id,
  headline,
  summary,
  highlightTexts,
  categoryCode,
  relatedNews,
  image,
}: NewsCardProps) => {
  return (
    <article className="group relative">
      {/* 메인 카드 */}
      <div
        className={cn(
          "flex h-412 overflow-hidden rounded-sm",
          "bg-opacity70 bg-cover bg-center bg-no-repeat",
          "relative",
        )}
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 80px) 100%, 0 100%)",
        }}
      >
        {/* 카드 전체 클릭 링크 */}
        <Link
          href={`${CLIENT_ROUTES.DETAILS}/${id}`}
          className="absolute inset-0 z-20"
          aria-label={headline}
        />
        {/* 호버 오버레이 */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 bg-white opacity-0 transition-opacity duration-200",
            "group-hover:opacity-20",
          )}
        />
        {/* 어두운 배경 레이어 */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="pointer-events-none relative z-30 flex w-full flex-col justify-between px-40 py-24">
          <div className="space-y-12">
            <Badge categoryCode={categoryCode} />
            <div className="font-sub2 line-clamp-2 text-white">{headline}</div>
            <p className="font-body6 text-gray4 line-clamp-4">
              <HighlightedText text={summary} highlightTexts={highlightTexts} />
            </p>
          </div>
          {/* 관련기사 - lg 이상에서만 카드 안에 표시 */}
          <div className="relative z-30 hidden space-y-12 lg:block">
            <RelatedNewsContent relatedNews={relatedNews} />
          </div>
        </div>
        {/* 우측 하단 파란색 접힘 삼각형 */}
        <div
          className="bg-blue2 absolute right-0 bottom-0 z-20 h-40 w-80"
          style={{
            clipPath: "polygon(0 100%, 100% 0, 0 0)",
          }}
        />
      </div>
      {/* 관련기사 - lg 미만에서는 카드 밖에 표시 */}
      <div className="mt-16 space-y-12 lg:hidden">
        <RelatedNewsContent relatedNews={relatedNews} />
      </div>
    </article>
  );
};

const RelatedNewsContent = ({
  relatedNews,
}: {
  relatedNews: GroupSourceHeadlineData[];
}) => {
  return (
    <>
      <p className="font-caption1 text-gray5">관련기사</p>
      <div className="space-y-8">
        {relatedNews.map((news, i) => (
          <InlineLink
            key={`${news.headline}-${i}`}
            headline={news.headline}
            url={news.url}
          />
        ))}
      </div>
    </>
  );
};

const InlineLink = ({ headline, url }: { headline: string; url?: string }) => {
  const isWebView =
    typeof window !== "undefined" && /WebView|wv/.test(navigator.userAgent);

  return url ? (
    <a
      href={url}
      {...(!isWebView && { target: "_blank", rel: "noreferrer noopener" })}
      className={cn(
        "pointer-events-auto flex flex-row items-center gap-8",
        "font-body5 text-gray10 lg:text-gray2 visited:text-blue2 truncate",
        "max-w-full lg:max-w-[calc(100%-72px)]",
      )}
    >
      <span>{headline}</span>
      <Image
        src="/images/icons/Icon_Link.png"
        alt="Link icon"
        width={16}
        height={16}
        className="flex-shrink-0"
      />
    </a>
  ) : (
    <div className="flex flex-row items-center gap-8">
      <span className="font-body5 text-gray4 max-w-full truncate lg:max-w-[calc(100%-72px)]">
        {headline}
      </span>
    </div>
  );
};
