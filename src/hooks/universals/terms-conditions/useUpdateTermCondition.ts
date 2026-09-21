import { updateTermCondition } from "@/services/universals/terms-conditions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTermCondition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTermCondition,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["terms-conditions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["terms-conditions", variables.id],
      });
    },
  });
};
