import { getApplicants } from "@/services/applicant.service";
import { useQuery } from "@tanstack/react-query";
import type { JobseekerPayload } from "@/@types/jobseekers";

export const useApplicants = (filters: JobseekerPayload) => {
  return useQuery({
    queryFn: () => getApplicants(filters),
    queryKey: ["applicants", filters],
  });
};
