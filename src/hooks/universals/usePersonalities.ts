import { getPersonalities } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const usePersonalities = () => {
  return useQuery({
    queryKey: ["personalities"],
    queryFn: getPersonalities,
  });
};
