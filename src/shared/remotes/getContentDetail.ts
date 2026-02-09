import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyBrowseContentDetailResponse } from "@/shared/types";

const getContentDetail = async (
  id: string,
): Promise<SuccessBodyBrowseContentDetailResponse> => {
  const response = await few.get<SuccessBodyBrowseContentDetailResponse>([
    API_ROUTES.CONTENT_DETAIL(id),
  ]);

  return response;
};

const getContentDetailOptions = (id: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.GET_CONTENT_DETAIL, id],
    queryFn: () => getContentDetail(id),
    select: (data) => data.data,
  });

export { getContentDetail, getContentDetailOptions };
