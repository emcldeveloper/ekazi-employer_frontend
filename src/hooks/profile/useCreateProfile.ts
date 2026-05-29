import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/services/profile.service";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
  });
};
