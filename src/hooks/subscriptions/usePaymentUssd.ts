import { pushUssd } from "@/services/subscriptions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePaymentUssd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reference: string) => pushUssd(reference),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payment-ussd"],
      });
    },
  });
};
