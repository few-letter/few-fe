import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/api/client/queryClient";
import { getContentDetailOptions, getCategoriesOptions } from "@/shared/remotes";
import { ContentDetailSection, SubscribeForm } from "@/shared/widgets";
import { Header, Banner } from "@/shared/components";
import { WorldType } from "@/shared/types";

interface DetailPageLayoutProps {
  id: string;
}

export const DetailPageLayout = async ({ id }: DetailPageLayoutProps) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getContentDetailOptions(id)),
    queryClient.prefetchQuery(getCategoriesOptions(WorldType.LOCAL)),
    queryClient.prefetchQuery(getCategoriesOptions(WorldType.GLOBAL)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="m-auto max-w-720 px-16 pt-60 md:px-24">
        <ContentDetailSection id={id} />
      </main>
      <Banner />
      <div className="bg-gray2 h-8 w-full md:hidden" />
      <section className="m-auto max-w-720 px-16 pt-24 md:px-24 md:pt-80">
        <SubscribeForm />
      </section>
    </HydrationBoundary>
  );
};
