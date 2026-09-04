import { applicantList } from "@/services/applicant.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminApplicants = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => applicantList(search, page, limit),
    queryKey: ["applicants", search, page, limit],
  });
};
