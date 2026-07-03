import { companyTypes } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useCompanyTypes = () => {
  return useQuery({
    queryFn: companyTypes,
    queryKey: ["company-types"],
  });
};
