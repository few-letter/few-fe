"use client";

import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ExternalLink, Share } from "lucide-react";
import { useState } from "react";
import {
  Badge,
  Divider,
  HighlightedText,
  IconButton,
  Toast,
} from "@/shared/components";
import { getContentDetailOptions } from "@/shared/remotes";
import {
  canUseWebShare,
  copyToClipboard,
  shareViaWebShare,
} from "@/shared/utils";

import type { CategoryCode } from "@/shared/types";

interface ContentDetailSectionProps {
  id: string;
}

const ContentDetailThumbnail = ({
  thumbnailImageUrl,
  headline,
}: {
  thumbnailImageUrl?: string;
  headline: string;
}) => {
  return (
    <div className="pt-24 md:py-40">
      {thumbnailImageUrl && (
        <figure className="relative aspect-video w-full overflow-hidden rounded-sm">
          <Image
            src={thumbnailImageUrl}
            alt={headline}
            fill
            className="object-cover"
          />
        </figure>
      )}
    </div>
  );
};

export const ContentDetailHeader = ({
  source,
  categoryCode,
  headline,
  createdAt,
  url,
  onShare,
}: {
  source: string;
  categoryCode: CategoryCode;
  headline: string;
  createdAt: string;
  url: string;
  onShare: () => void;
}) => {
  return (
    <header className="flex flex-col gap-16 py-24">
      <Badge categoryCode={categoryCode} variant="secondary" />
      <h1 className="font-heading3 font-bold md:text-[32px]">{headline}</h1>
      <div className="flex items-center gap-8">
        <span className="font-caption2 text-gray7 md:font-body3">{source}</span>
        <Divider orientation="vertical" />
        <time className="font-caption2 text-gray7 md:font-body3">
          {new Date(createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <div className="mt-8 flex flex-row gap-12">
        <IconButton
          icon={<ExternalLink size={16} />}
          label="원본 뉴스 보러가기"
          onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        />
        <IconButton
          icon={<Share size={16} />}
          label="공유하기"
          onClick={onShare}
        />
      </div>
    </header>
  );
};

export const ContentDetailSection = ({ id }: ContentDetailSectionProps) => {
  const { data: content } = useSuspenseQuery(getContentDetailOptions(id));
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (canUseWebShare()) {
      const result = await shareViaWebShare({
        title: content.headline,
        url: shareUrl,
      });
      if (result === "success" || result === "cancelled") return;
    }

    const copied = await copyToClipboard(shareUrl);

    setToastMessage(
      copied ? "링크가 복사되었습니다." : "링크 복사에 실패했습니다.",
    );
  };

  return (
    <article>
      <ContentDetailThumbnail
        thumbnailImageUrl={content.thumbnailImageUrl}
        headline={content.headline}
      />
      <ContentDetailHeader
        source={content.mediaType.value}
        categoryCode={content.category.code}
        headline={content.headline}
        createdAt={content.createdAt}
        url={content.url}
        onShare={handleShare}
      />
      <section className="mt-0 md:mt-40">
        <p className="font-body6 text-gray7 leading-relaxed">
          <HighlightedText
            text={content.summary}
            highlightTexts={content.highlightTexts}
            highlightColor="bg-news-highlight"
          />
        </p>
      </section>
      <footer className="h-24 md:h-120" />
      <Toast
        className="top-80 left-1/2 -translate-x-1/2"
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage(null)}
      />
    </article>
  );
};
