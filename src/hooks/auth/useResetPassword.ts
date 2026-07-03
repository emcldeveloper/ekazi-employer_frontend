import { resetPassword } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reset-password"],
      });
    },
  });
};
