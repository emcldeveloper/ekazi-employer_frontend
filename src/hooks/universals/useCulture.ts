import { getCultures } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useCultures = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["cultures", search, page, limit],
    queryFn: () => getCultures(search, page, limit),
  });
};
