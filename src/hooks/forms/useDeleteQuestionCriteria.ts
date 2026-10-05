import { deleteQuestionCriteria } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteQuestionCriteria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteQuestionCriteria(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["question-criterias"],
      });

      queryClient.invalidateQueries({
        queryKey: ["evaluation-question"],
      });
    },
  });
};
