import { evaluationQuestions } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useEvaluationQuestions = ({
  search = "",
  page = 1,
  limit = 25,
}) => {
  return useQuery({
    queryFn: () => evaluationQuestions({ search, page, limit }),
    queryKey: ["evaluation-questions", search, page, limit],
  });
};
