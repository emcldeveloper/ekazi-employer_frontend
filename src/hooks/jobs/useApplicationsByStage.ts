import { getApplicationsByStage } from "@/services/jobs.service";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useApplicationsByStage = (
  {
    id,
    stage,
  }: {
    id: number;
    stage: string;
  },
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["job-applications", id, stage],
    queryFn: () => getApplicationsByStage({ id, stage }),
    ...options,
  });
};
