import { employerDetails } from "@/services/employers.service";
import { useQuery } from "@tanstack/react-query";

export const useEmployer = (id: number) => {
  return useQuery({
    queryFn: () => employerDetails(id),
    queryKey: ["employer-details", id],
    enabled: !!id,
  });
};
