import { getUsers } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = ({ search = "", page = 1, limit = 25 }) => {
  return useQuery({
    queryFn: () => getUsers(search, page, limit),
    queryKey: ["users", search, page, limit],
  });
};
