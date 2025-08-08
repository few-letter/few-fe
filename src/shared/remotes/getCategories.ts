import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type {
  SuccessBodyListCodeValueResponse,
  CodeValueResponse,
} from "@/shared/types";
import type { UseQueryOptions } from "@tanstack/react-query";

const getCategories = async () => {
  const response = await few.get<SuccessBodyListCodeValueResponse>([
    API_ROUTES.CATEGORIES,
  ]);

  return response;
};

const getCategoriesOptions = (): UseQueryOptions<
  SuccessBodyListCodeValueResponse,
  unknown,
  CodeValueResponse[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_CATEGORIES],
    queryFn: () => getCategories(),
    staleTime: Infinity,
  };
};

export { getCategoriesOptions };
