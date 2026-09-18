import { updatePermission } from "@/services/universals/permissions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePermission,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["permission", variables.id],
      });
    },
  });
};
