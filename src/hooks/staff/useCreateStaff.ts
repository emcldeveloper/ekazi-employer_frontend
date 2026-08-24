import { createStaff } from "@/services/staff.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStaff,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });
};
