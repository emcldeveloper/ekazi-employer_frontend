import { forgotPassword } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forgot-password"],
      });
    },
  });
};
