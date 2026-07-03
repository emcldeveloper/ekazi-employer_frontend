import { companySizes } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useCompanySizes = () => {
  return useQuery({
    queryFn: companySizes,
    queryKey: ["company-sizes"],
  });
};
