import { useQuery } from "@tanstack/react-query";
import { fetchPayment } from "@/services/subscriptions.service";

export const usePayment = (reference: string) => {
  return useQuery({
    queryFn: () => fetchPayment(reference),
    queryKey: ["payment-details", reference],
    enabled: !!reference,
  });
};
