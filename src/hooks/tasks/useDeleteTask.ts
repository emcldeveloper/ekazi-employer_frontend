import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/tasks.service";

export const useDeleteTask = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
