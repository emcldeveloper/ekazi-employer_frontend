import { createEvaluationQuestion } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEvaluationQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvaluationQuestion,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["evaluation-questions"],
      });
    },
  });
};
