import { getApplicant } from "@/services/applicant.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicant = (id: number) => {
  return useQuery({
    queryFn: () => getApplicant(id),
    queryKey: ["applicant-details", id],
    enabled: id !== null,
  });
};
