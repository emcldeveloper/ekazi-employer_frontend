import { getRegions } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useRegions = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getRegions(search, page, limit),
    queryKey: ["regions", search, page, limit],
  });
};
