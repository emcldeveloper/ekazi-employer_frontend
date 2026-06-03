import { getJob } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJob = (id: number) => {
  return useQuery({
    queryKey: ["job-details"],
    queryFn: () => getJob(id),
  });
};
