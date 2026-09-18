import { createPermission } from "@/services/universals/permissions.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPermission,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};
