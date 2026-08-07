import { getJobseeker } from "@/services/jobseekers.service";
import { useQuery } from "@tanstack/react-query";

export const useJobseeker = (id: number) => {
  return useQuery({
    queryFn: () => getJobseeker(id),
    queryKey: ["jobseeker-details", id],
    enabled: !!id,
  });
};
