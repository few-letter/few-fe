import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyBrowseGroupGenResponses, WorldType } from "../types";

const getGroups = async ({
  worldType,
  date,
}: {
  worldType: WorldType;
  date: string;
}): Promise<SuccessBodyBrowseGroupGenResponses> => {
  const response = await few.get<SuccessBodyBrowseGroupGenResponses>(
    [API_ROUTES.GROUPS(worldType), { date }],
    { cache: "no-store" },
  );

  return response;
};

const getGroupsOptions = (worldType: WorldType, date: string) => {
  return queryOptions({
    queryKey: [QUERY_KEY.GET_GROUPS(worldType), date],
    queryFn: () => getGroups({ worldType, date }),
  });
};

export { getGroupsOptions };
