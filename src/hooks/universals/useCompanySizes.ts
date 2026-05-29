import { useQuery } from "@tanstack/react-query";
import { getCompanySize } from "@/services/universal.service";

export const useCompanySizes = () => {
  return useQuery({
    queryKey: ["company-sizes"],
    queryFn: getCompanySize,
  });
};
