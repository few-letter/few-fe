import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type {
  SuccessBodyBrowseGroupGenResponses,
  BrowseGroupGenResponse,
} from "../types";
import type { UseQueryOptions } from "@tanstack/react-query";

const getGroups = async ({
  date,
}: {
  date: string;
}): Promise<SuccessBodyBrowseGroupGenResponses> => {
  const response = await few.get<SuccessBodyBrowseGroupGenResponses>([
    API_ROUTES.GROUPS,
    { date, cache: "no-store" },
  ]);

  return response;
};

const getGroupsOptions = (
  date: string,
): UseQueryOptions<
  SuccessBodyBrowseGroupGenResponses,
  unknown,
  BrowseGroupGenResponse[]
> => {
  return {
    queryKey: [QUERY_KEY.GET_GROUPS, date],
    queryFn: () => getGroups({ date }),
  };
};

export { getGroupsOptions };
