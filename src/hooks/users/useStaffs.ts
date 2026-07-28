import { getStaffs } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useStaffs = () => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: getStaffs,
  });
};
