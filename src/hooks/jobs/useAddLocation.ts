import { addLocation } from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLocation,

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
