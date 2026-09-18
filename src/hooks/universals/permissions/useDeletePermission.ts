import { deletePermission } from "@/services/universals/permissions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePermission,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};
