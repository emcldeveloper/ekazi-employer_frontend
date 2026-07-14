import { getSalaryRange } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useSalaryRange = (
  search?: string,
  page?: number,
  limit?: number,
) => {
  return useQuery({
    queryFn: () => getSalaryRange(search, page, limit),
    queryKey: ["salary-range", search, page, limit],
  });
};
