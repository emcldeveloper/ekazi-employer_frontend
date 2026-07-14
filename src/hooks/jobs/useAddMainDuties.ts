import { addMainDuties, editMainDuties } from "@/services/jobs.service";
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

export const useEditMainDuties = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMainDuties,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["job-details", variables.payload.job_id],
      });
    },
  });
};
