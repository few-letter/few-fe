import { queryOptions } from "@tanstack/react-query";

import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";

import type { SuccessBodyBrowseGroupGenResponses, WorldType } from "../types";

const getGroups = async ({
  worldType,
}: {
  worldType: WorldType;
}): Promise<SuccessBodyBrowseGroupGenResponses> => {
  const response = await few.get<SuccessBodyBrowseGroupGenResponses>(
    [API_ROUTES.GROUPS(worldType)],
    { cache: "no-store" },
  );

  return response;
};

const getGroupsOptions = (worldType: WorldType) => {
  return queryOptions({
    queryKey: [QUERY_KEY.GET_GROUPS(worldType)],
    queryFn: () => getGroups({ worldType }),
  });
};

export { getGroupsOptions };
