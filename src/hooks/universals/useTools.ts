import { getTools } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useTools = (search = "", page = 1, limit = 25) => {
  return useQuery({
    queryKey: ["tools", search, page, limit],
    queryFn: () => getTools(search, page, limit),
  });
};
