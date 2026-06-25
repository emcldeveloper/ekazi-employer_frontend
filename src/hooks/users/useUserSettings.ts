import { userSettings } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useUserSettings = () => {
  return useQuery({
    queryKey: ["users-settings"],
    queryFn: userSettings,
  });
};
