import { getKnowledges } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useKnowledges = () => {
  return useQuery({
    queryKey: ["knowledges"],
    queryFn: getKnowledges,
  });
};
