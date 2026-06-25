import { deleteJob } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteJob = (jobId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteJob(jobId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
