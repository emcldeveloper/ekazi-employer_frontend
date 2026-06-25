import { getPersonalities } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const usePersonalities = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["personalities", search, page, limit],
    queryFn: () => getPersonalities(search, page, limit),
  });
};
