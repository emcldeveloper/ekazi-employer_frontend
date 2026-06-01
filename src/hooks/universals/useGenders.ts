import { getGenders } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useGenders = () => {
  return useQuery({
    queryKey: ["genders"],
    queryFn: getGenders,
  });
};
