import { ListPlusIcon } from "lucide-react";

import type { Job } from "@/@types/job";

interface OtherRequirementsDetailsProps {
  job: Job;
}

const OtherRequirementsDetails = ({ job }: OtherRequirementsDetailsProps) => {
  const otherRequirement = job?.other_requirements?.[0]?.other_requirement
    ?.replace(/<[^>]*>/g, "")
    .trim();

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <ListPlusIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Other Requirements</h2>
        </div>
      </div>

      {otherRequirement ? (
        <div
          className="prose prose-sm max-w-none
               prose-headings:font-semibold
               prose-ul:list-disc
               prose-ul:pl-6 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: job?.other_requirements?.[0]?.other_requirement,
          }}
        />
      ) : (
        <div className="py-4 text-center text-muted-foreground dark:text-white">
          No data available
        </div>
      )}
    </div>
  );
};

export default OtherRequirementsDetails;
