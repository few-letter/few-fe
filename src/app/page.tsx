import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  DailyFewHeader,
  DailyFewSection,
  DailyFewSummary,
  HomeTracker,
} from "@/shared/widgets";
import { Header } from "@/shared/components";

import { getGroupsOptions, getCategoriesOptions } from "@/shared/remotes";
import { getQueryClient } from "@/api/client/queryClient";

export default async function Home() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getCategoriesOptions("local")),
    queryClient.prefetchQuery(getGroupsOptions("local")),
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
