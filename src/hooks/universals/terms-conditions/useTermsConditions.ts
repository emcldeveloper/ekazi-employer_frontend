import { termsConditions } from "@/services/universals/terms-conditions.service";
import { useQuery } from "@tanstack/react-query";

export const useTermsConditions = () => {
  return useQuery({
    queryFn: termsConditions,
    queryKey: ["terms-conditions"],
  });
};
