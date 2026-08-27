import { createSubscription } from "@/services/subscriptions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-subscriptions"],
      });
    },
  });
};
