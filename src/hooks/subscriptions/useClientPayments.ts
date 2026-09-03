import { useQuery } from "@tanstack/react-query";
import { clientPayments } from "@/services/subscriptions.service";

export const useClientPayments = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => clientPayments(search, page, limit),
    queryKey: ["client-payments", search, page, limit],
  });
};
