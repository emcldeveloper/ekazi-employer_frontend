import { dashboard } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboard = () => {
  return useQuery({
    queryFn: dashboard,
    queryKey: ["admin-statistics"],
  });
};
