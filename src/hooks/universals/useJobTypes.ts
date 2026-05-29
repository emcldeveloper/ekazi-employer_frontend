import { getJobTypes } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useJobTypes = () => {
  return useQuery({
    queryKey: ["job-types"],
    queryFn: getJobTypes,
  });
};
