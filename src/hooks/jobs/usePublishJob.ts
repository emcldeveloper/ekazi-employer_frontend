import { publishJob } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePublishJob = (jobId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publishJob(jobId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["job-details", jobId],
      });

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
