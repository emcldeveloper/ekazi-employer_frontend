import { getColleges } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useColleges = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getColleges(search, page, limit),
    queryKey: ["colleges", search, page, limit],
  });
};
