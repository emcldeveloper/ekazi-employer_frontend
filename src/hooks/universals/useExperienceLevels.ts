import { getCountries } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useExperienceLevels = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryKey: ["experience-levels", search, page, limit],
    queryFn: () => getCountries(search, page, limit),
  });
};
