import { getPermissions } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const usePermissions = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryFn: () => getPermissions(search, page, limit),
    queryKey: ["permissions", search, page, limit],
  });
};
