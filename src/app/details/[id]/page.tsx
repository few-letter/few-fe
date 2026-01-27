import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/api/client/queryClient";
import { getContentDetailOptions } from "@/shared/remotes";
import { ContentDetailSection } from "@/shared/widgets";
import { Header, Banner } from "@/shared/components";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getContentDetailOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="m-auto max-w-720 px-16 pt-60 md:px-24">
        <ContentDetailSection id={id} />
      </main>
      <Banner />
    </HydrationBoundary>
  );
}
