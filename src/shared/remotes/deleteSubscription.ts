import { few } from "@/api/client/few";
import { API_ROUTES } from "@/shared/constants";

import type { SuccessBodyDeleteSubscriptionResponse } from "@/shared/types";
import type { UseMutationOptions } from "@tanstack/react-query";

interface DeleteSubscriptionRequest {
  email: string;
}

const deleteSubscription = async ({ email }: DeleteSubscriptionRequest) => {
  const response = await few.delete<SuccessBodyDeleteSubscriptionResponse>(
    [API_ROUTES.SUBSCRIBE],
    undefined,
    { headers: { email } },
  );

  return response;
};

const deleteSubscriptionMutation = (): UseMutationOptions<
  SuccessBodyDeleteSubscriptionResponse,
  unknown,
  DeleteSubscriptionRequest
> => {
  return {
    mutationFn: deleteSubscription,
  };
};

export { deleteSubscription, deleteSubscriptionMutation };
