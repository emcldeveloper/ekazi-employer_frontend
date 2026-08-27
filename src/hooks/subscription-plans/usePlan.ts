import { useQuery } from "@tanstack/react-query";
import { planDetails } from "@/services/subscriptions.service";

export const usePlan = (id: number) => {
  return useQuery({
    queryFn: () => planDetails(id),
    queryKey: ["plan-details", id],
    enabled: !!id,
  });
};
