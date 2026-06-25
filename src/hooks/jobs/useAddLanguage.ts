import { addLanguage } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLanguage,

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
