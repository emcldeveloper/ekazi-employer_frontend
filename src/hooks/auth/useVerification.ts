import { verify } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verify,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["verify"],
      });
    },
  });
};
