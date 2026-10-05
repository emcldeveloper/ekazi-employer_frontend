import { deleteEvaluationQuestion } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteEvaluationQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEvaluationQuestion(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["evaluation-questions"],
      });
    },
  });
};
