import { getSoftwares } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useSoftwares = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["softwares", search, page, limit],
    queryFn: () => getSoftwares(search, page, limit),
  });
};
