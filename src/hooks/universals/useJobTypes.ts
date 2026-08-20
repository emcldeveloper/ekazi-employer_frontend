import { getJobTypes } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useJobTypes = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getJobTypes(search, page, limit),
    queryKey: ["job-types", search, page, limit],
  });
};
