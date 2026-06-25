import { fetchApplicant } from "@/services/applicant.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicant = (applicant_id: number | null) => {
  return useQuery({
    queryKey: ["applicant-profile", applicant_id],
    queryFn: () => fetchApplicant(applicant_id),
    enabled: applicant_id !== null,
  });
};
