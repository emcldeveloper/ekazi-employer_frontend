import { useJobs } from "@/hooks/jobs";
import PreviewJobCard from "./PreviewJobCard";
import { Spinner } from "@/components/ui/spinner";
import type { Job } from "@/@types/job";
import { Card, CardContent } from "@/components/ui/card";

const PreviewJobs = () => {
  const { data: jobsData, isLoading } = useJobs({
    status: "active",
  });

  const jobs = jobsData?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-xl font-bold">Jobs Live Preview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preview how active jobs appear on the ekazi website.
        </p>
      </div>
      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center mt-10 md:col-span-2">
            <Spinner className="size-8" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="md:col-span-2">
            <Card>
              <CardContent>
                <div className="text-center text-muted-foreground">
                  No active published jobs.
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          jobs.map((job: Job) => (
            <div key={job.id}>
              <PreviewJobCard job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PreviewJobs;
