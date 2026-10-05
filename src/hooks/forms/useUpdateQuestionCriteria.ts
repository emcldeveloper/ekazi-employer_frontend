import { updateQuestionCriteria } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateQuestionCriteria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestionCriteria,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["question-criterias"],
      });

      queryClient.invalidateQueries({
        queryKey: ["question-criteria", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["evaluation-question"],
      });
    },
  });
};
