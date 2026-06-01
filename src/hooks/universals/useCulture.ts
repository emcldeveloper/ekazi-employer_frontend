import { getCultures } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useCultures = () => {
  return useQuery({
    queryKey: ["cultures"],
    queryFn: getCultures,
  });
};
