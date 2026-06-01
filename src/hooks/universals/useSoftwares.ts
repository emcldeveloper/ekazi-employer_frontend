import { getSoftwares } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useSoftwares = () => {
  return useQuery({
    queryKey: ["softwares"],
    queryFn: getSoftwares,
  });
};
