import { interviewTypes } from "@/services/universal.service";
import { useQuery } from "@tanstack/react-query";

export const useInterviewTypes = () => {
  return useQuery({
    queryKey: ["interview-types"],
    queryFn: interviewTypes,
  });
};
