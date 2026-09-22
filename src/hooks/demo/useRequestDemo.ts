import { requestDemo } from "@/services/request-demo.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRequestDemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestDemo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request-demo"],
      });
    },
  });
};
