import { getTermCondition } from "@/services/universals/terms-conditions.service";
import { useQuery } from "@tanstack/react-query";

export const useTermCondition = (id: number) => {
  return useQuery({
    queryFn: () => getTermCondition(id),
    queryKey: ["terms-conditions", id],
    enabled: !!id,
  });
};
