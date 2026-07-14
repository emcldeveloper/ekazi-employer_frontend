import {
  deleteJobLanguage,
  editJobLanguage,
  jobLanguage,
} from "@/services/jobs.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobLanguage,

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

export const useEditLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editJobLanguage,

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

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobLanguage,

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
