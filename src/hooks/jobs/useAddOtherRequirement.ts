import {
  addOtherRequirements,
  editOtherRequirements,
} from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddOtherRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOtherRequirements,

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

export const useEditOtherRequirement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editOtherRequirements,

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
