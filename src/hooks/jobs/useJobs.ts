import type { JobFilters } from "@/@types/jobs";
import { getJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobs = (filters: JobFilters) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs(filters),
  });
};
