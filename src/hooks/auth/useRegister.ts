import { register } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["register"],
      });
    },
  });
};
