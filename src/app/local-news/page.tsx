import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/api/client/queryClient";
import {
  DailyFewHeader,
  DailyFewSection,
  DailyFewSummary,
  HomeTracker,
} from "@/shared/widgets";
import { Header } from "@/shared/components";
import { getGroupsOptions, getCategoriesOptions } from "@/shared/remotes";
import { WorldType } from "@/shared/types";
import { SITE_URL, CLIENT_ROUTES } from "@/shared/constants";

const pageUrl = `${SITE_URL}${CLIENT_ROUTES.LOCAL}`;

export const metadata: Metadata = {
  title: "국내 AI 뉴스",
  description:
    "AI가 매일 엄선한 국내 IT/테크 뉴스레터. 주요 뉴스를 한눈에 정리해드립니다.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    url: pageUrl,
  },
};

export default async function Home() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getCategoriesOptions(WorldType.LOCAL)),
    queryClient.prefetchQuery(getGroupsOptions(WorldType.LOCAL)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTracker />
      <Header />
      <main className="m-auto max-w-1200">
        <section className="px-16">
          <DailyFewHeader />
          <div className="flex w-full flex-col gap-24 overflow-hidden pb-40 md:flex-row">
            <DailyFewSection />
          </div>
        </section>
        <div className="bg-gray2 h-16 w-full lg:hidden" />
        <section className="px-16">
          <Suspense fallback={<div>loading...</div>}>
            <DailyFewSummary />
          </Suspense>
        </section>
      </main>
    </HydrationBoundary>
  );
}
