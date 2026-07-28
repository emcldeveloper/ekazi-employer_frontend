import { selectCandidate } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSelection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: selectCandidate,

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
