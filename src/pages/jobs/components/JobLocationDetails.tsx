import type { Job } from "@/@types/job";
import { MapPinIcon } from "lucide-react";

interface JobLocationDetailsProps {
  job: Job;
}

const JobLocationDetails = ({ job }: JobLocationDetailsProps) => {
  return (
    <div className="flex justify-between gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <MapPinIcon size={16} />
          </div>

          <h2 className="text-lg font-semibold">Job Location</h2>
        </div>

        <div className="grid grid-cols-[120px_1fr] gap-y-3">
          <p className="text-sm text-muted-foreground">Country</p>
          <p className="font-medium">{job?.country?.name}</p>

          <p className="text-sm text-muted-foreground">Region</p>
          <p className="font-medium">{job?.region?.name}</p>

          <p className="text-sm text-muted-foreground">Sub Location</p>
          <p className="font-medium">{job?.addresses?.[0]?.sub_location}</p>
        </div>
      </div>
    </div>
  );
};

export default JobLocationDetails;
