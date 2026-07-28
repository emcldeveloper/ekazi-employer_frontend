import { applicationStages } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicationStages = () => {
  return useQuery({
    queryFn: applicationStages,
    queryKey: ["application-stages"],
  });
};
