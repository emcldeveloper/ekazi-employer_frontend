import { ListIcon } from "lucide-react";

import type { Job } from "@/@types/job";

interface DutiesDetailsProps {
  job: Job;
}

const DutiesDetails = ({ job }: DutiesDetailsProps) => {
  const mainDuties = job?.requirements?.[0]?.main_duties
    ?.replace(/<[^>]*>/g, "")
    .trim();

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <ListIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Main Duties</h2>
        </div>
      </div>

      {mainDuties ? (
        <div
          className="prose prose-sm max-w-none
                 prose-headings:font-semibold
                 prose-ul:list-disc
                 prose-ul:pl-6 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: job?.requirements?.[0]?.main_duties,
          }}
        />
      ) : (
        <div className="py-4 text-center text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
};

export default DutiesDetails;
