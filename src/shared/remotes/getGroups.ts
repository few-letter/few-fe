import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyBrowseGroupGenResponses } from "../types";

const getGroups = async ({
  date,
}: {
  date: string;
}): Promise<SuccessBodyBrowseGroupGenResponses> => {
  const response = await few.get<SuccessBodyBrowseGroupGenResponses>(
    [API_ROUTES.GROUPS, { date }],
    { cache: "no-store" },
  );

  return response;
};

const getGroupsOptions = (date: string) => {
  return queryOptions({
    queryKey: [QUERY_KEY.GET_GROUPS, date],
    queryFn: () => getGroups({ date }),
  });
};

export { getGroupsOptions };
