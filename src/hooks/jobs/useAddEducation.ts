import { addEducation } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEducation,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job", variables.job_id],
      });
    },
  });
};
