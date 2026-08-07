import type { JobseekerPayload } from "@/@types/jobseekers";
import { getJobseekers } from "@/services/jobseekers.service";
import { useQuery } from "@tanstack/react-query";

export const useJobseekers = (filters: JobseekerPayload) => {
  return useQuery({
    queryFn: () => getJobseekers(filters),
    queryKey: ["jobseekers", filters],
  });
};
