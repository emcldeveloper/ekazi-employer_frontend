import { getUsers } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = ({ page = 1, limit = 25, search = "" }) => {
  return useQuery({
    queryFn: () => getUsers(page, limit, search),
    queryKey: ["users", page, limit, search],
  });
};
