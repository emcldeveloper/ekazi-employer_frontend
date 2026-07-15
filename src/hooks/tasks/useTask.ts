import { useQuery } from "@tanstack/react-query";
import { singleTask } from "@/services/tasks.service";

export const useTask = (id: number) => {
  return useQuery({
    queryFn: () => singleTask(id),
    queryKey: ["task-details", id],
    enabled: !!id,
  });
};
