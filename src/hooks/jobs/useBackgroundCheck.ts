import { backgroundCheckCandidate } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBackgroundCheck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: backgroundCheckCandidate,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details", variables.jobId],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-applications", variables.jobId],
      });
    },
  });
};
