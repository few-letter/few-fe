"use client";

import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getContentDetailOptions } from "@/shared/remotes";

interface ContentDetailSectionProps {
  id: string;
}

export const ContentDetailSection = ({ id }: ContentDetailSectionProps) => {
  const { data: content } = useSuspenseQuery(getContentDetailOptions(id));

  return (
    <article className="py-24">
      <header className="mb-24">
        <span className="text-primary text-14 font-medium">
          {content.category.value}
        </span>
        <h1 className="text-24 md:text-32 mt-8 leading-tight font-bold">
          {content.headline}
        </h1>
        <time className="text-gray5 text-14 mt-12 block">
          {new Date(content.createdAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {content.thumbnailImageUrl && (
        <figure className="rounded-8 relative mb-24 aspect-video w-full overflow-hidden">
          <Image
            src={content.thumbnailImageUrl}
            alt={content.headline}
            fill
            className="object-cover"
          />
        </figure>
      )}

      <section className="mb-24">
        <h2 className="text-18 font-semibold">요약</h2>
        <p className="text-gray7 text-16 mt-8 leading-relaxed">
          {content.summary}
        </p>
      </section>

      {content.highlightTexts.length > 0 && (
        <section className="mb-24">
          <h2 className="text-18 font-semibold">핵심 포인트</h2>
          <ul className="mt-8 space-y-8">
            {content.highlightTexts.map((text, index) => (
              <li key={index} className="text-gray7 text-16 flex">
                <span className="text-primary mr-8">•</span>
                {text}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="border-gray3 border-t pt-16">
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-14 hover:underline"
        >
          원문 보기
        </a>
      </footer>
    </article>
  );
};
