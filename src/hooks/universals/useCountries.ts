import { getCountries } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useCountries = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryKey: ["countries", search, page, limit],
    queryFn: () => getCountries(search, page, limit),
  });
};
