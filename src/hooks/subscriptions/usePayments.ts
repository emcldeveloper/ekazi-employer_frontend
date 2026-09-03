import { useQuery } from "@tanstack/react-query";
import { fetchPayments } from "@/services/subscriptions.service";

export const usePayments = (limit = 25, offset = 0) => {
  return useQuery({
    queryFn: () => fetchPayments(limit, offset),
    queryKey: ["payments", limit, offset],
  });
};
