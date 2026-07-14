import { getPositions } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const usePositions = (search: string, page = 1, limit = 50) => {
  return useQuery({
    queryFn: () => getPositions(search, page, limit),
    queryKey: ["positions", search, page, limit],
  });
};
