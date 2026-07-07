import { resend } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resend,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resend"],
      });
    },
  });
};
