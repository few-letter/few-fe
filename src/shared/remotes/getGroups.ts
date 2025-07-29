import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";
import { formatDateToYYYYMMDD } from "@/shared/utils";

import type {
  SuccessBodyBrowseGroupGenResponses,
  BrowseGroupGenResponse,
} from "../types";
import type { QueryClient, UseQueryOptions } from "@tanstack/react-query";

const getGroups = async ({
  date,
}: {
  date: string;
}): Promise<SuccessBodyBrowseGroupGenResponses> => {
  const response = await few.get<SuccessBodyBrowseGroupGenResponses>([
    API_ROUTES.GROUPS,
    { date },
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
    select: (data) => data.data.groups,
  };
};

export { getGroupsOptions };
