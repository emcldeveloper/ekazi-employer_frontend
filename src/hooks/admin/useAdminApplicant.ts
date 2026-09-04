import { applicantDetails } from "@/services/applicant.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminApplicant = (id: number) => {
  return useQuery({
    queryFn: () => applicantDetails(id),
    queryKey: ["applicant-details", id],
    enabled: !!id,
  });
};
