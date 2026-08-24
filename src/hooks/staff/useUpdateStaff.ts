import { updateStaff } from "@/services/staff.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStaff,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });

      queryClient.invalidateQueries({
        queryKey: ["staff-details", variables.id],
      });
    },
  });
};
