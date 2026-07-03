import { deleteForm } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteForm,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
};
