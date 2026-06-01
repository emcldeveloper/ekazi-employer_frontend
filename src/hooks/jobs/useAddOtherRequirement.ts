import { addOtherRequirements } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOtherRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOtherRequirements,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job", variables.job_id],
      });
    },
  });
};
