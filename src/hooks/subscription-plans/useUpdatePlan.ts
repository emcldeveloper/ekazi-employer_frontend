import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlan } from "@/services/subscriptions.service";

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlan,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });

      queryClient.invalidateQueries({
        queryKey: ["plan-details", variables.id],
      });
    },
  });
};
