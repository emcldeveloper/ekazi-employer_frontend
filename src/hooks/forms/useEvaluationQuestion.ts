import { evaluationQuestion } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useEvaluationQuestion = (id: number) => {
  return useQuery({
    queryFn: () => evaluationQuestion(id),
    queryKey: ["evaluation-question", id],
    enabled: !!id,
  });
};
