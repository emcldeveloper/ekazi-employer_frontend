import { employCandidate } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEmployed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employCandidate,

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
