import { updateForm } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateForm(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });

      queryClient.invalidateQueries({
        queryKey: ["forms", variables.id],
      });
    },
  });
};
