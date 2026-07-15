import { getApplicationsByStage } from "@/services/jobs.service";
import { useQuery } from "@tanstack/react-query";

export const useApplicationsByStage = ({
  id,
  stage,
}: {
  id: number;
  stage: string;
}) => {
  return useQuery({
    queryFn: () => getApplicationsByStage({ id, stage }),
    queryKey: ["job-applications", id],
  });
};
