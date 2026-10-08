import { evaluateCandidate } from "@/services/forms.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEvaluateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: evaluateCandidate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["evaluate-candidate"],
      });
    },
  });
};
