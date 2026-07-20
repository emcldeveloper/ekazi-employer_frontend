import { useQuery } from "@tanstack/react-query";
import { taskDetails } from "@/services/tasks.service";

export const useTask = (id: number) => {
  return useQuery({
    queryFn: () => taskDetails(id),
    queryKey: ["task-details", id],
    enabled: !!id,
  });
};
