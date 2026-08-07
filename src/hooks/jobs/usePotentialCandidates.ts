import { getPotentialCandidates } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const usePotentialCandidates = (
  id: number,
  search = "",
  page = 1,
  limit = 25,
) => {
  return useQuery({
    queryKey: ["potential-candidates", id, search, page, limit],
    queryFn: () => getPotentialCandidates(id, search, page, limit),
    enabled: !!id,
  });
};
