import { employersList } from "@/services/employers.service";
import { useQuery } from "@tanstack/react-query";

export const useEmployers = (
  search = "",
  page = 1,
  limit = 25,
  featured = "",
) => {
  return useQuery({
    queryFn: () => employersList(search, page, limit, featured),
    queryKey: ["employers", search, page, limit, featured],
  });
};
