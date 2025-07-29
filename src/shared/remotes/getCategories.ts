import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyListCodeValueResponse } from "@/shared/types";
import type { QueryClient } from "@tanstack/react-query";

const getCategories = async () => {
  const response = await few.get<SuccessBodyListCodeValueResponse>([
    API_ROUTES.CATEGORIES,
  ]);

  return response.data;
};

const prefetchCategories = async (serverQueryClient: QueryClient) => {
  await serverQueryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_CATEGORIES],
    queryFn: getCategories,
    staleTime: Infinity,
  });
};

export { prefetchCategories };
