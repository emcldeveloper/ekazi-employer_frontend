import { getSalaryRange } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useSalaryRange = () => {
  return useQuery({
    queryKey: ["salary-range"],
    queryFn: getSalaryRange,
  });
};
