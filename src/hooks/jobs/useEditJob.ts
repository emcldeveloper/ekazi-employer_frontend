import { updateJob } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job", variables.id],
      });
    },
  });
};
