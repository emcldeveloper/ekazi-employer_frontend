import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/services/tasks.service";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["task-details", variables.id],
      });
    },
  });
};
