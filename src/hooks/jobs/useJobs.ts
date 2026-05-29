import { getJobs } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
};
