import { createPlan } from "@/services/subscriptions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
};
