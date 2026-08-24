import { getStaffDetails } from "@/services/staff.service";
import { useQuery } from "@tanstack/react-query";

export const useStaff = (id: number) => {
  return useQuery({
    queryFn: () => getStaffDetails(id),
    queryKey: ["staff-details", id],
    enabled: !!id,
  });
};
