import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type {
  SuccessBodyBrowseContentResponses,
  WorldType,
} from "@/shared/types";

interface GetContentsParams {
  worldType: WorldType;
  prevContentId: number;
  category: string | number;
}

const getContents = async ({
  worldType,
  prevContentId = -1,
  category,
}: GetContentsParams): Promise<SuccessBodyBrowseContentResponses> => {
  const response = await few.get<SuccessBodyBrowseContentResponses>([
    API_ROUTES.CONTENTS(worldType),
    category === "all" ? { prevContentId } : { prevContentId, category },
  ]);

  return response;
};

const getInfiniteContentsOptions = (
  worldType: WorldType,
  category: string | number,
) => {
  return {
    queryKey: [QUERY_KEY.GET_CONTENTS(worldType), category],
    queryFn: ({ pageParam = -1 }: { pageParam?: number }) =>
      getContents({ worldType, prevContentId: pageParam, category }),
    getNextPageParam: (data: SuccessBodyBrowseContentResponses) => {
      const contents = data.data.contents;
      const isLastPage = data.data.isLast || contents.length === 0;

      if (isLastPage) {
        return undefined;
      }

      return contents[contents.length - 1].id;
    },
    initialPageParam: -1,
  };
};

export { getInfiniteContentsOptions };
