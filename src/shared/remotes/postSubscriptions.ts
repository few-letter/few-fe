import { few } from "@/api/client/few";
import { API_ROUTES } from "@/shared/constants";

import type {
  SuccessBodyPostSubscriptionsResponse,
  PostRequestBody,
} from "@/shared/types";
import type { UseMutationOptions } from "@tanstack/react-query";

const postSubscriptions = async ({ email, categoryCodes }: PostRequestBody) => {
  const categoryCodesNumber = categoryCodes.map((code) => Number(code));
  const response = await few.post<SuccessBodyPostSubscriptionsResponse>(
    [API_ROUTES.SUBSCRIBE],
    { email, categoryCodes: categoryCodesNumber },
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
