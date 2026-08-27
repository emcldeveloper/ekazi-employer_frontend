import { useQuery } from "@tanstack/react-query";
import { plansList } from "@/services/subscriptions.service";

export const usePlans = (page = 1, limit = 25, search = "") => {
  return useQuery({
    queryFn: () => plansList(page, limit, search),
    queryKey: ["plans", page, limit, search],
  });
};
