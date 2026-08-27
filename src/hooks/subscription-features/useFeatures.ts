import { useQuery } from "@tanstack/react-query";
import { featuresList } from "@/services/subscriptions.service";

export const useFeatures = (page = 1, limit = 25, search = "") => {
  return useQuery({
    queryFn: () => featuresList(page, limit, search),
    queryKey: ["features", page, limit, search],
  });
};
