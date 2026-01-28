import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/api/client/queryClient";
import { getCategoriesOptions } from "@/shared/remotes";
import { WorldType } from "@/shared/types";
import { Banner, Header } from "@/shared/components";
import { SubscribeForm } from "@/shared/widgets";

export const metadata = {
  title: "Subscribe",
  description: "Subscribe",
};

export default async function SubscribePage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getCategoriesOptions(WorldType.LOCAL)),
    queryClient.prefetchQuery(getCategoriesOptions(WorldType.GLOBAL)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <div className="mt-64">
        <Banner />
        <section className="m-auto max-w-588 px-16 pb-60 md:mt-48 md:pb-120">
          <SubscribeForm />
        </section>
      </div>
    </HydrationBoundary>
  );
}
