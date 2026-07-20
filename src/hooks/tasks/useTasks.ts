import { useQuery } from "@tanstack/react-query";
import { tasksList } from "@/services/tasks.service";

export const useTasks = () => {
  return useQuery({
    queryFn: tasksList,
    queryKey: ["tasks"],
  });
};
