import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeature } from "@/services/subscriptions.service";

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFeature(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["features"],
      });
    },
  });
};
