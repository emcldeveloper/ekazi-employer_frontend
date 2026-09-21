import { createTermCondition } from "@/services/universals/terms-conditions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTermCondition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTermCondition,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["terms-conditions"],
      });
    },
  });
};
