import { jobDetails } from "@/services/admin-jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminJob = (id: number) => {
  return useQuery({
    queryFn: () => jobDetails(id),
    queryKey: ["job-details", id],
    enabled: !!id,
  });
};
