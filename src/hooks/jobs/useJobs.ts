import type { JobFilters } from "@/@types/jobs";
import { getJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobs = (filters: JobFilters) => {
  return useQuery({
    queryFn: () => getJobs(filters),
    queryKey: ["jobs", filters],
  });
};
