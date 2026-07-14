import { getJob } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJob = (id: number) => {
  return useQuery({
    queryFn: () => getJob(id),
    queryKey: ["job-details", id],
    enabled: !!id,
  });
};
