import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlan } from "@/services/subscriptions.service";
import type { PlanPayload } from "@/@types/subscriptions";

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: PlanPayload }) =>
      updatePlan(id, payload),

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
