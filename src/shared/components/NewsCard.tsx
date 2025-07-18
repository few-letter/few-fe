import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Badge, type Category } from "@/shared/components";

import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  category: Category;
  title: string;
  description: string;
  image: string;
}

export default function NewsCard({
  title,
  description,
  image,
  category,
}: NewsCardProps) {
  return (
    <div className="relative">
      {/* 메인 카드 */}
      <div
        className={cn(
          "flex h-412 rounded-sm",
          "bg-opacity70 bg-cover bg-center bg-no-repeat",
          "relative",
        )}
        style={{
          backgroundImage: `url(${image})`,
          clipPath:
            "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 80px) 100%, 0 100%)",
        }}
      >
        {/* 어두운 배경 레이어 */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex w-full flex-col justify-between px-40 py-24">
          <div className="space-y-12">
            <Badge category={category} />
            <Link
              href={`/news/${title}`}
              className={cn(
                "font-sub2 block text-white",
                "visited:text-blue2",
                "transition-colors duration-200",
              )}
            >
              {title}
            </Link>
            <p className="font-body6 text-gray4 line-clamp-3">{description}</p>
          </div>
          {/* 관련기사 - lg 이상에서만 카드 안에 표시 */}
          <div className="hidden space-y-12 lg:block">
            <RelatedNewsContent />
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
        <RelatedNewsContent />
      </div>
    </div>
  );
}

const RelatedNewsContent = () => {
  return (
    <>
      <p className="font-caption1 text-gray5">관련기사</p>
      <div className="space-y-8">
        <InlineLink
          link="/news/1"
          title="기사제목이 길어진 경우 어떻게 될까?기사제목이 길어진 경우 어떻게 될까?기사제목이 길어진 경우 어떻게 될까?"
        />
        <InlineLink
          link="/news/2"
          title="기사제목이 길어진 경우 어떻게 될까?기사제목이 길어진 경우 어떻게 될까?기사제목이 길어진 경우 어떻게 될까?"
        />
        <InlineLink
          link="/news/3"
          title="기사제목이 길어진 경우 어떻게 될까?기사제목이 길어진 경우 어떻게 될까?기사제목이 길어진 경우 어떻게 될까?"
        />
      </div>
    </>
  );
};

const InlineLink = ({ link, title }: { link: string; title: string }) => {
  return (
    <div className="flex flex-row items-center gap-8">
      <Link
        href={link}
        className={cn(
          "font-body5 text-gray10 lg:text-gray2 visited:text-blue2 truncate",
          "max-w-full lg:max-w-[calc(100%-72px)]",
        )}
      >
        {title}
      </Link>
      <Image
        src="/images/icons/Icon_Link.png"
        alt="Link icon"
        width={16}
        height={16}
        className="flex-shrink-0"
      />
    </div>
  );
};
