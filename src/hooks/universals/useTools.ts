import { getTools } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useTools = () => {
  return useQuery({
    queryKey: ["tools"],
    queryFn: getTools,
  });
};
