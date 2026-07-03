import { changePassword } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["change-password"],
      });
    },
  });
};
