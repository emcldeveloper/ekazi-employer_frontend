import { deleteStaff } from "@/services/staff.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteStaff(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });
};
