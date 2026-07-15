import { useQuery } from "@tanstack/react-query";
import { allTasks } from "@/services/tasks.service";

export const useTasks = () => {
  return useQuery({
    queryFn: allTasks,
    queryKey: ["tasks"],
  });
};
