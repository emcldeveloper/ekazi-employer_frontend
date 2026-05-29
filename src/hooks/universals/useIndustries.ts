import { getIndustry } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useIndustries = () => {
  return useQuery({
    queryKey: ["industries"],
    queryFn: getIndustry,
  });
};
