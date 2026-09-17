import { initiateRegistrationPayment } from "@/services/subscriptions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegistrationPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: initiateRegistrationPayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-subscriptions"],
      });
    },
  });
};
