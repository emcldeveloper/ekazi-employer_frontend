import { settingsJob } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJobSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsJob,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["job-details", variables.jobId],
      });

      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
