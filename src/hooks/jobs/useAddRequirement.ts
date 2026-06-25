import type { JobRequirementData } from "@/@types/jobs";
import { addRequirements } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      payload,
    }: {
      jobId: number;
      payload: JobRequirementData;
    }) => addRequirements(jobId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details", variables.jobId],
      });
    },
  });
};
