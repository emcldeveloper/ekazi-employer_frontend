import { getApplicationsByStage } from "@/services/jobs.service";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useApplicationsByStage = (
  {
    id,
    stage,
    page = 1,
    limit = 10,
    search = "",
  }: {
    id: number;
    stage: string;
    search?: string;
    page?: number;
    limit?: number;
  },
  options?: Omit<UseQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["job-applications", id, stage, page, limit, search],
    queryFn: () =>
      getApplicationsByStage({
        id,
        stage,
        search,
        page,
        limit,
      }),
    ...options,
  });
};
