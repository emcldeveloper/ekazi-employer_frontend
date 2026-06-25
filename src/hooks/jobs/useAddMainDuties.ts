import { addMainDuties } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddMainDuties = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMainDuties,

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
