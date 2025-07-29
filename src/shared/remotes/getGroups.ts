import { few } from "@/api/client/few";
import { API_ROUTES, QUERY_KEY } from "@/shared/constants";
import { formatDateToYYYYMMDD } from "@/shared/utils";

import type {
  SuccessBodyBrowseGroupGenResponses,
  BrowseGroupGenResponses,
} from "../types";
import type { QueryClient } from "@tanstack/react-query";

const getGroups = async ({
  date,
}: {
  date: string;
}): Promise<BrowseGroupGenResponses> => {
  const response = await few.get<SuccessBodyBrowseGroupGenResponses>([
    API_ROUTES.GROUPS,
    { date },
  ]);

  return response.data;
};

const prefetchGroups = async (serverQueryClient: QueryClient) => {
  const date = formatDateToYYYYMMDD(new Date());
  await serverQueryClient.prefetchQuery({
    queryKey: [QUERY_KEY.GET_GROUPS, date],
    queryFn: () => getGroups({ date }),
  });
};

export { prefetchGroups };
