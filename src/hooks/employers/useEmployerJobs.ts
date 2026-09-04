import { employerJobs } from "@/services/employers.service";
import { useQuery } from "@tanstack/react-query";

export const useEmployerJobs = (
  id: number,
  search = "",
  page = 1,
  limit = 25,
) => {
  return useQuery({
    queryFn: () => employerJobs(id, search, page, limit),
    queryKey: ["jobs", id, search, page, limit],
  });
};
