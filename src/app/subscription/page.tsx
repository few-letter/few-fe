import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/api/client/queryClient";
import { getCategoriesOptions } from "@/shared/remotes";
import { WorldType } from "@/shared/types";
import { Banner, Header } from "@/shared/components";
import { SubscribeForm } from "@/shared/widgets";
import { SITE_URL, CLIENT_ROUTES } from "@/shared/constants";

const pageUrl = `${SITE_URL}${CLIENT_ROUTES.SUBSCRIPTION}`;

export const metadata = {
  title: "뉴스레터 구독",
  description:
    "FEW 뉴스레터를 무료로 구독하세요. AI가 매일 엄선한 IT/테크 뉴스를 이메일로 받아볼 수 있습니다.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    url: pageUrl,
  },
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
