import { useQuery } from "@tanstack/react-query";
import { clientSubscriptions } from "@/services/subscriptions.service";

export const useClientSubscriptions = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => clientSubscriptions(search, page, limit),
    queryKey: ["client-subscriptions", search, page, limit],
  });
};
