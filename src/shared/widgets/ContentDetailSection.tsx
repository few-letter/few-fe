"use client";

import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ExternalLink, Share } from "lucide-react";

import {
  Badge,
  Divider,
  HighlightedText,
  IconButton,
} from "@/shared/components";
import { getContentDetailOptions } from "@/shared/remotes";
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
}: {
  source: string;
  categoryCode: CategoryCode;
  headline: string;
  createdAt: string;
  url: string;
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
          onClick={() => window.open(url, "_blank")}
        />
        <IconButton
          icon={<Share size={16} />}
          label="공유하기"
          onClick={() => {
            // TODO: 공유하기 기능 구현
          }}
        />
      </div>
    </header>
  );
};

export const ContentDetailSection = ({ id }: ContentDetailSectionProps) => {
  const { data: content } = useSuspenseQuery(getContentDetailOptions(id));

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
      />
      <section className="mt-40">
        <p className="font-body6 text-gray7 leading-relaxed">
          <HighlightedText
            text={content.summary}
            highlightTexts={content.highlightTexts}
            highlightColor="bg-news-highlight"
          />
        </p>
      </section>
      <footer className="h-120" />
    </article>
  );
};
