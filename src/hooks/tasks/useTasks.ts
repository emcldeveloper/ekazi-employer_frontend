import { useQuery } from "@tanstack/react-query";
import { tasksList } from "@/services/tasks.service";

export const useTasks = ({ page = 1, limit = 25, search = "" }) => {
  return useQuery({
    queryFn: () => tasksList(page, limit, search),
    queryKey: ["tasks", page, limit, search],
  });
};
