import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignTask } from "@/services/tasks.service";

export const useAssignTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task-assignments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-details"],
      });
    },
  });
};
