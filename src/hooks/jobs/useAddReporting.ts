import { addReporting } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddReporting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReporting,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details", variables.job_id],
      });
    },
  });
};
