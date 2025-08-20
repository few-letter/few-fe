import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Header } from "@/shared/components";
import { DailyFewHeader, DailyFewSection } from "@/shared/widgets";

import { getGroupsOptions, getCategoriesOptions } from "@/shared/remotes";
import { getQueryClient } from "@/api/client/queryClient";
import {
  formatDateToYYYYMMDD,
  formatKoreanDate,
  getRefreshDate,
} from "@/shared/utils";

export default async function Home() {
  const queryClient = getQueryClient();
  const newsDate = getRefreshDate(new Date());
  const newsDateFormatted = formatDateToYYYYMMDD(newsDate);
  const newsDateFormattedKorean = formatKoreanDate(newsDate);

  const categoriesResponse = await queryClient.fetchQuery(
    getCategoriesOptions(),
  );
  const groupsResponse = await queryClient.fetchQuery(
    getGroupsOptions(newsDateFormatted),
  );
  const categoriesData = categoriesResponse.data;
  const groupsData = groupsResponse.data.groups;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="m-auto max-w-1200">
        <section className="px-16">
          <DailyFewHeader currentDate={newsDateFormattedKorean} />
          <div className="flex w-full flex-col gap-24 overflow-hidden pb-40 md:flex-row">
            <DailyFewSection news={groupsData} categories={categoriesData} />
          </div>
        </section>
        <div className="bg-gray2 h-16 w-full lg:hidden" />
        <section className="px-16">
          <div className="text-gray9 font-heading3 pt-40 pb-16 text-center lg:pb-24 lg:text-left">
            한줄 요약 few.
          </div>
        </section>
      </main>
    </HydrationBoundary>
  );
}
