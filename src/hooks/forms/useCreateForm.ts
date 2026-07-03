import { createForm } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createForm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
};
