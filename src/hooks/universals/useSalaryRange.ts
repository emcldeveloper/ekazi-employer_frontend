import { getSalaryRange } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useSalaryRange = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getSalaryRange(search, page, limit),
    queryKey: ["salary-range", search, page, limit],
  });
};
