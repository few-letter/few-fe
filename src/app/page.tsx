import { Header, NewsCard } from "@/shared/components";

export default function Home() {
  return (
    <div className="m-auto max-w-1200">
      <Header />
      <main className="px-16 py-24">
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
  );
}
