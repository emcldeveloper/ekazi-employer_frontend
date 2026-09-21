import { previewJobs } from "@/services/jobs/preview-jobs.service";
import { useQuery } from "@tanstack/react-query";

export const usePreviewJobs = () => {
  return useQuery({
    queryFn: previewJobs,
    queryKey: ["jobs"],
  });
};
