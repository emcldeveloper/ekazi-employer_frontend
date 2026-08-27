import { useQuery } from "@tanstack/react-query";
import { featureDetails } from "@/services/subscriptions.service";

export const useFeature = (id: number) => {
  return useQuery({
    queryFn: () => featureDetails(id),
    queryKey: ["feature-details", id],
    enabled: !!id,
  });
};
