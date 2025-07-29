import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Header } from "@/shared/components";
import { DailyFewHeader, DailyFewSection } from "@/shared/widgets";

import { getGroupsOptions, getCategoriesOptions } from "@/shared/remotes";
import { getQueryClient } from "@/api/client/queryClient";
import { formatDateToYYYYMMDD } from "@/shared/utils";

export default async function Home() {
  const today = formatDateToYYYYMMDD(new Date());
  const queryClient = getQueryClient();

  const categoriesResponse = await queryClient.fetchQuery(
    getCategoriesOptions(),
  );
  const groupsResponse = await queryClient.fetchQuery(getGroupsOptions(today));
  const categoriesData = getCategoriesOptions().select!(categoriesResponse);
  const groupsData = getGroupsOptions(today).select!(groupsResponse);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <div className="m-auto max-w-1200">
        <main className="px-16">
          <DailyFewHeader />
          <section className="flex w-full flex-col gap-24 overflow-hidden md:flex-row">
            <DailyFewSection news={groupsData} categories={categoriesData} />
          </section>
        </main>
      </div>
    </HydrationBoundary>
  );
}
