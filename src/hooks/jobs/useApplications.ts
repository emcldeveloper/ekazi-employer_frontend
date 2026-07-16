import { getApplications } from "@/services/jobs.service";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useApplications = (
  id: number,
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["job-applications", id],
    queryFn: () => getApplications(id),
    ...options,
  });
};
