import { createQuestionCriteria } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateQuestionCriteria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestionCriteria,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["question-criterias"],
      });

      queryClient.invalidateQueries({
        queryKey: ["evaluation-question", variables.evaluation_id],
      });
    },
  });
};
