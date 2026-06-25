import { getJob } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useUserDetails = (id: number) => {
  return useQuery({
    queryKey: ["user-details", id],
    queryFn: () => getJob(id),
    enabled: !!id,
  });
};
