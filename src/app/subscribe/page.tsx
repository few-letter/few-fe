import { getCategoriesOptions } from "@/shared/remotes";
import { getQueryClient } from "@/api/client/queryClient";

import { SubscribeForm } from "@/shared/widgets";

export default async function SubscribePage() {
  const queryClient = getQueryClient();
  const categoriesResponse = await queryClient.fetchQuery(
    getCategoriesOptions(),
  );
  const categories = categoriesResponse.data;

  return (
    <section className="m-auto mt-32 max-w-588 px-16 md:mt-80">
      <h1 className="font-heading4 text-gray10">few. 뉴스 구독하기</h1>
      <p className="font-body5 text-gray7">
        한줄로 떠먹여주는 AI 요약 뉴스레터, 보고싶은 카테고리만 모아 평일 아침
        9시에 받아보세요.
      </p>
      <SubscribeForm categories={categories} />
    </section>
  );
}
