import { getProficiencies } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useProficiencies = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["proficiencies", search, page, limit],
    queryFn: () => getProficiencies(search, page, limit),
  });
};
