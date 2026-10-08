import { evaluationResult } from "@/services/forms.service";
import { useQuery } from "@tanstack/react-query";

export const useEvaluationResults = (applicant_id: number, job_id: number) => {
  return useQuery({
    queryFn: () => evaluationResult(applicant_id, job_id),
    queryKey: ["question-criteria", applicant_id, job_id],
    enabled: !!applicant_id && !!job_id,
  });
};
