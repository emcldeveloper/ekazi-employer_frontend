import { getPermission } from "@/services/universals/permissions.service";
import { useQuery } from "@tanstack/react-query";

export const usePermission = (id: number) => {
  return useQuery({
    queryFn: () => getPermission(id),
    queryKey: ["permission", id],
    enabled: !!id,
  });
};
