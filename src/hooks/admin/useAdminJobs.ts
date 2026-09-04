import { getAllJobs } from "@/services/admin-jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminJobs = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getAllJobs(search, page, limit),
    queryKey: ["jobs", search, page, limit],
  });
};
