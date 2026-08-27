import { createFeature } from "@/services/subscriptions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeature,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["features"],
      });
    },
  });
};
