import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlan } from "@/services/subscriptions.service";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePlan(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
};
