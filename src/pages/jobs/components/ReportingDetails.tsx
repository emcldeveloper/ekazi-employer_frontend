import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLineIcon, UsersIcon } from "lucide-react";
import ReportingForm from "./ReportingForm";
import { useState } from "react";

interface ReportingDetailsProps {
  job: any;
}

const ReportingDetails = ({ job }: ReportingDetailsProps) => {
  const [open, setOpen] = useState(false);

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
          <p className="font-medium">{job?.job_report_to?.report_to}</p>

          <p className="text-sm text-muted-foreground">Interact</p>
          <p className="font-medium">{job?.job_report_to?.interacts_with}</p>

          <p className="text-sm text-muted-foreground">Supervises</p>
          <p className="font-medium">{job?.job_report_to?.supervises}</p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <PencilLineIcon className="mr-2 size-4" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reporting Structure</DialogTitle>
            <DialogDescription>Edit reporting structure.</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
            <ReportingForm job={job} onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportingDetails;
