import { MapPinIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface JobLocationDetailsProps {
  job: any;
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
          <p className="font-medium">
            {job?.job_addresses?.[0]?.region?.country?.name}
          </p>

          <p className="text-sm text-muted-foreground">Region</p>
          <p className="font-medium">
            {job?.job_addresses?.[0]?.region?.region_name}
          </p>

          <p className="text-sm text-muted-foreground">Sub Location</p>
          <p className="font-medium">{job?.job_addresses?.[0]?.sub_location}</p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          {/* <Button size="sm" variant="outline">
            <PencilLineIcon className="mr-2 size-4" />
            Edit
          </Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Job Location</DialogTitle>
            <DialogDescription>Edit job location.</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
            {/* <LocationForm /> */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobLocationDetails;
