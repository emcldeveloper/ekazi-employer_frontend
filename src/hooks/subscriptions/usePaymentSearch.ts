import { useQuery } from "@tanstack/react-query";
import { searchPayment } from "@/services/subscriptions.service";

export const usePaymentSearch = () => {
  return useQuery({
    queryFn: searchPayment,
    queryKey: ["payments-search"],
  });
};
