import { getApplications } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useApplications = (id: number) => {
  return useQuery({
    queryFn: () => getApplications(id),
    queryKey: ["job-applications", id],
  });
};
