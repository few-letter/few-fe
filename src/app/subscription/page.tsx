import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCategoriesOptions } from "@/shared/remotes";
import { getQueryClient } from "@/api/client/queryClient";
import { WorldType } from "@/shared/types";
import { Banner, Header } from "@/shared/components";
import { SubscribeForm } from "@/shared/widgets";

export const metadata = {
  title: "Subscribe",
  description: "Subscribe",
};

export default async function SubscribePage() {
  const queryClient = getQueryClient();

  const [localCategoriesResponse, globalCategoriesResponse] = await Promise.all(
    [
      queryClient.fetchQuery(getCategoriesOptions(WorldType.LOCAL)),
      queryClient.fetchQuery(getCategoriesOptions(WorldType.GLOBAL)),
    ],
  );

  const localCategories = localCategoriesResponse.data;
  const globalCategories = globalCategoriesResponse.data;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <div className="mt-64">
        <Banner />
        <section className="m-auto max-w-588 px-16 md:mt-48">
          <h1 className="font-heading4 text-gray10 pt-32 pb-8">
            few. 뉴스 구독하기
          </h1>
          <p className="font-body5 text-gray7">
            한줄로 떠먹여주는 AI 요약 뉴스레터, 보고싶은 카테고리만 모아 평일
            아침 9시에 받아보세요.
          </p>
          <SubscribeForm
            localCategories={localCategories}
            globalCategories={globalCategories}
          />
        </section>
      </div>
    </HydrationBoundary>
  );
}
