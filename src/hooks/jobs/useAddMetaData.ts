import { addMetaData } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddMetaData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMetaData,

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
