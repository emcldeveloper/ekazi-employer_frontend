import { positionLevels } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const usePositionLevels = () => {
  return useQuery({
    queryFn: positionLevels,
    queryKey: ["position-levels"],
  });
};
