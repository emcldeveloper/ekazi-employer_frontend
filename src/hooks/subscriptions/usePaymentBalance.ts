import { useQuery } from "@tanstack/react-query";
import { fetchBalance } from "@/services/subscriptions.service";

export const usePaymentBalance = () => {
  return useQuery({
    queryFn: fetchBalance,
    queryKey: ["payments-balance"],
  });
};
