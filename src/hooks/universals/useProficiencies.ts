import { getProficiencies } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useProficiencies = () => {
  return useQuery({
    queryKey: ["proficiencies"],
    queryFn: getProficiencies,
  });
};
