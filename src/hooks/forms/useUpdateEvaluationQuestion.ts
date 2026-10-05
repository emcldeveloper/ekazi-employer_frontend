import { updateEvaluationQuestion } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEvaluationQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvaluationQuestion,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["evaluation-questions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["evaluation-question", variables.id],
      });
    },
  });
};
