import { getRegions } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useRegions = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
};
