import { fetchApplicant } from "@/services/applicant.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicant = (applicant_id: number) => {
  return useQuery({
    queryFn: () => fetchApplicant(applicant_id),

    queryKey: ["applicant-profile", applicant_id],
    enabled: applicant_id !== null,
  });
};
