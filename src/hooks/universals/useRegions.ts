import { getRegions } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useRegions = (search = "", page = 1, limit = 60) => {
  return useQuery({
    queryFn: () => getRegions(search, page, limit),
    queryKey: ["regions"],
  });
};
