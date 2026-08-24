import { getStaff } from "@/services/staff.service";
import { useQuery } from "@tanstack/react-query";

export const useStaffs = ({ search = "", page = 1, limit = 25 }) => {
  return useQuery({
    queryFn: () => getStaff(search, page, limit),
    queryKey: ["staff", search, page, limit],
  });
};
