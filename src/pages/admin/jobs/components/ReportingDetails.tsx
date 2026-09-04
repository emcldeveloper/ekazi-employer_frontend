import { UsersIcon } from "lucide-react";
import type { Job } from "@/@types/job";

interface ReportingDetailsProps {
  job: Job;
}

const ReportingDetails = ({ job }: ReportingDetailsProps) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <UsersIcon size={16} />
          </div>

          <h2 className="text-lg font-semibold">Reporting Structure</h2>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-3">
          <p className="text-sm text-muted-foreground">Report To</p>
          <p className="font-medium">{job?.report_to?.[0]?.report_to}</p>

          <p className="text-sm text-muted-foreground">Interact</p>
          <p className="font-medium">{job?.report_to?.[0]?.interacts_with}</p>

          <p className="text-sm text-muted-foreground">Supervises</p>
          <p className="font-medium">{job?.report_to?.[0]?.supervises}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportingDetails;
