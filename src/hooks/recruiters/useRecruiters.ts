import { getRecruiters } from "@/services/recruiters.service";
import { useQuery } from "@tanstack/react-query";

export const useRecruiters = (
  search = "",
  page = 1,
  limit = 25,
  featured = "",
) => {
  return useQuery({
    queryFn: () => getRecruiters(search, page, limit, featured),
    queryKey: ["recruiters", search, page, limit, featured],
  });
};
