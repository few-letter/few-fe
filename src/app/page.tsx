"use client";

import { Header, NewsCard } from "@/shared/components";
import { formatKoreanDate } from "@/shared/utils";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="m-auto max-w-1200">
        <main className="px-16">
          <DailyFewHeader />
          <section className="flex w-full flex-col gap-24 overflow-hidden md:flex-row">
            <div className="min-w-0 flex-1">
              <NewsCard
                category="ECONOMY"
                title="테슬라 주가 50% 하락하며 월가 불안 테슬라 주가 50% 하락"
                description="테슬라 주가는 최근 50% 하락하며 월가의 불안감을 증대시켰습니다. 중국의 농산물에 대한 보복 관세 부과로 인해 미국 주식 시장은 큰 타격을 받았고, 나스닥 지수는 6개월 만에 최저치를 기록했습니다. 테슬라 주가는 3개월 동안 50% 이상 하락하며, 현재 주가는 $239.57입니다. 테슬라 주가는 최근 50% 하락하며 월가의 불안감을 증대시켰습니다."
                image="https://dummyimage.com/600x400/000/fff"
              />
            </div>
            <div className="hidden min-w-0 flex-1 md:block">
              <NewsCard
                category="ECONOMY"
                title="테슬라 주가 50% 하락하며 월가 불안 테슬라 주가 50% 하락"
                description="테슬라 주가는 최근 50% 하락하며 월가의 불안감을 증대시켰습니다. 중국의 농산물에 대한 보복 관세 부과로 인해 미국 주식 시장은 큰 타격을 받았고, 나스닥 지수는 6개월 만에 최저치를 기록했습니다. 테슬라 주가는 3개월 동안 50% 이상 하락하며, 현재 주가는 $239.57입니다. 테슬라 주가는 최근 50% 하락하며 월가의 불안감을 증대시켰습니다."
                image="https://dummyimage.com/600x400/000/fff"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

const DailyFewHeader = () => {
  const currentDate = formatKoreanDate(new Date());
  return (
    <div className="pt-16 pb-16 lg:pt-60 lg:pb-24">
      <div className="hidden lg:block">
        <span className="font-heading4 text-blue3">{currentDate}</span>
        <span className="font-heading4 text-gray10">&nbsp;데일리 few.</span>
      </div>
      <div className="block rounded-sm bg-black px-16 py-12 lg:hidden">
        <Link href="/" className="font-body5 text-blue3">
          🗞️ 보고 싶은 카테고리 무료 구독
        </Link>
      </div>
    </div>
  );
};
