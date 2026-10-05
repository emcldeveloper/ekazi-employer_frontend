import { questionCriteria } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useQuestionCriteria = (id: number) => {
  return useQuery({
    queryFn: () => questionCriteria(id),
    queryKey: ["question-criteria", id],
    enabled: !!id,
  });
};
