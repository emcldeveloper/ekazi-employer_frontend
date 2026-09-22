import { getPaymentStatus } from "@/services/payments.service";
import { useQuery } from "@tanstack/react-query";

export const usePaymentStatus = (reference?: string) => {
  return useQuery({
    queryKey: ["payments", reference],
    queryFn: () => getPaymentStatus(reference!),
    enabled: !!reference,
    refetchInterval: 3000,
  });
};
