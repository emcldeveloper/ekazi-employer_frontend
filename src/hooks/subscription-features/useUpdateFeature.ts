import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeature } from "@/services/subscriptions.service";

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeature,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["features"],
      });

      queryClient.invalidateQueries({
        queryKey: ["feature-details", variables.id],
      });
    },
  });
};
