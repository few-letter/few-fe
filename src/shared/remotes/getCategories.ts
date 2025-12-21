import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyListCodeValueResponse } from "@/shared/types";

const getCategories = async () => {
  const response = await few.get<SuccessBodyListCodeValueResponse>([
    API_ROUTES.CATEGORIES,
  ]);

  return response;
};

const getCategoriesOptions = () => {
  return queryOptions({
    queryKey: [QUERY_KEY.GET_CATEGORIES],
    queryFn: () => getCategories(),
    staleTime: Infinity,
  });
};

export { getCategoriesOptions };
