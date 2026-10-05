import { questionCriterias } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useQuestionCriterias = () => {
  return useQuery({
    queryFn: questionCriterias,
    queryKey: ["question-criterias"],
  });
};
