import { deleteTermCondition } from "@/services/universals/terms-conditions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTermCondition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTermCondition,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["terms-conditions"],
      });
    },
  });
};
