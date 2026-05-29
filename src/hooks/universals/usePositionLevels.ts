import { getPositionLevel } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const usePositionLevels = () => {
  return useQuery({
    queryKey: ["position-levels"],
    queryFn: getPositionLevel,
  });
};
