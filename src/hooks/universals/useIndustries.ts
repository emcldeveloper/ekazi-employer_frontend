import { getIndustry } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useIndustries = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["industries", search, page, limit],
    queryFn: () => getIndustry(search, page, limit),
  });
};
