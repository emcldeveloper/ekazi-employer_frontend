import { usePreviewJobs } from "@/hooks/jobs";
import PreviewJobCard from "./PreviewJobCard";
import { Spinner } from "@/components/ui/spinner";

const PreviewJobs = () => {
  const { data: jobsData, isLoading } = usePreviewJobs();
  const jobs = jobsData?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-xl font-bold">Jobs Preview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preview how jobs will appear on the Ekazi website.
        </p>
      </div>
      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job: any) => (
          <div key={job.id}>
            <PreviewJobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewJobs;
