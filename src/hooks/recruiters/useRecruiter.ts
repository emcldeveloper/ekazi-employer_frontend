import { getRecruiter } from "@/services/recruiters.service";
import { useQuery } from "@tanstack/react-query";

export const useRecruiter = (id: number) => {
  return useQuery({
    queryFn: () => getRecruiter(id),
    queryKey: ["employer-details", id],
    enabled: !!id,
  });
};
