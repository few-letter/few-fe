import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyListCodeValueResponse } from "@/shared/types";

const getContentTypes = async () => {
  const response = await few.get<SuccessBodyListCodeValueResponse>([
    API_ROUTES.CONTENT_TYPES,
  ]);

  return response;
};

const getContentTypesOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEY.GET_CONTENT_TYPES],
    queryFn: () => getContentTypes(),
    staleTime: Infinity,
  });
};

export { getContentTypesOptions };
