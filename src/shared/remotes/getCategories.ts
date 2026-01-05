import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { WorldType } from "@/shared/types";

import type { SuccessBodyListCodeValueResponse } from "@/shared/types";

const getCategories = async (worldType: WorldType) => {
  const response = await few.get<SuccessBodyListCodeValueResponse>([
    API_ROUTES.CATEGORIES(worldType),
  ]);

  return response;
};

const getCategoriesOptions = (worldType: WorldType) => {
  return queryOptions({
    queryKey: [QUERY_KEY.GET_CATEGORIES(worldType)],
    queryFn: () => getCategories(worldType),
    staleTime: Infinity,
  });
};

export { getCategoriesOptions };
