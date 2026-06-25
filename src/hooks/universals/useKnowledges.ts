import { getKnowledges } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useKnowledges = (search = "", page = 1, limit = 50) => {
  return useQuery({
    queryKey: ["knowledges", search, page, limit],
    queryFn: () => getKnowledges(search, page, limit),
  });
};
