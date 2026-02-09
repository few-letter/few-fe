import { few } from "@/api/client/few";
import { API_ROUTES } from "@/shared/constants";

import type {
  SuccessBodyPostSubscriptionsResponse,
  PostRequestBody,
} from "@/shared/types";
import type { UseMutationOptions } from "@tanstack/react-query";

const postSubscriptions = async (requestBody: PostRequestBody) => {
  const response = await few.post<SuccessBodyPostSubscriptionsResponse>(
    [API_ROUTES.SUBSCRIBE],
    requestBody,
  );

  return response;
};

const postSubscriptionsMutation = (): UseMutationOptions<
  SuccessBodyPostSubscriptionsResponse,
  unknown,
  PostRequestBody
> => {
  return {
    mutationFn: postSubscriptions,
  };
};

export { postSubscriptions, postSubscriptionsMutation };
