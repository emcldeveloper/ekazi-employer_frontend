import { getApplications } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useApplications = (id: number) => {
  return useQuery({
    queryKey: ["job-applications", id],
    queryFn: () => getApplications(id),
  });
};
