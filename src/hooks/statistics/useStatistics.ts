import { getStatistics } from "@/services/statistics.service";
import { useQuery } from "@tanstack/react-query";

export const useStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });
};
