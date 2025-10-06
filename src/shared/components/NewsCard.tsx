import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Badge } from "./Badge";
import { HighlightedText } from "./HighlightedText";

import type {
  GroupSourceHeadlineData,
  CategoryCode,
  CodeValueResponse,
} from "@/shared/types";

interface NewsCardProps {
  categoryCode: CategoryCode;
  headline: string;
  summary: string;
  highlightTexts: string[];
  relatedNews: GroupSourceHeadlineData[];
  categories: CodeValueResponse[];
  image?: string;
}

export const NewsCard = ({
  categories,
  headline,
  summary,
  highlightTexts,
  categoryCode,
  relatedNews,
  image,
}: NewsCardProps) => {
  return (
    <div className="relative">
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
        {/* 어두운 배경 레이어 */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex w-full flex-col justify-between px-40 py-24">
          <div className="space-y-12">
            <Badge categoryCode={categoryCode} categories={categories} />
            <div className="font-sub2 line-clamp-2 text-white">{headline}</div>
            <p className="font-body6 text-gray4 line-clamp-4">
              <HighlightedText text={summary} highlightTexts={highlightTexts} />
            </p>
          </div>
          {/* 관련기사 - lg 이상에서만 카드 안에 표시 */}
          <div className="hidden space-y-12 lg:block">
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
    </div>
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
  return url ? (
    <Link
      target="_blank"
      rel="noreferrer noopener"
      href={url}
      className={cn(
        "flex flex-row items-center gap-8",
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
    </Link>
  ) : (
    <div className="flex flex-row items-center gap-8">
      <span className="font-body5 text-gray4 max-w-full truncate lg:max-w-[calc(100%-72px)]">
        {headline}
      </span>
    </div>
  );
};
