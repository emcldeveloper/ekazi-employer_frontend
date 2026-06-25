import { EyeIcon, PencilLineIcon, UsersIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import BasicInfoForm from "./BasicInfoForm";
import { useState } from "react";

interface BasicDetailsProps {
  job: any;
}

const BasicDetails = ({ job }: BasicDetailsProps) => {
  const [open, setOpen] = useState(false);

  // job published status, 1 === true or 0 === false
  const publishedStatus = Number(job?.published);

  return (
    <div className="flex justify-between gap-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">
          {job?.job_position?.position_name}
        </h1>

        <div className="flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 text-orange-700 p-2 rounded-md">
              <EyeIcon size={16} />
            </div>
            <p>{job?.statistic?.job_views | 0}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-primary p-2 rounded-md">
              <UsersIcon size={16} />
            </div>
            <p>{job?.applied_count}</p>
          </div>
          {publishedStatus === 1 ? (
            <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
              Published
            </Badge>
          ) : (
            <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Unpublished
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-[150px_1fr] gap-y-3">
          <p className="text-sm text-muted-foreground">Job Type:</p>
          <p className="font-medium">{job?.job_type?.type_name}</p>

          <p className="text-sm text-muted-foreground">Job Category:</p>
          <p className="font-medium">{job?.job_category?.industry_name}</p>

          <p className="text-sm text-muted-foreground">Job Industry:</p>
          <p className="font-medium">{job?.industry?.industry_name}</p>

          <p className="text-sm text-muted-foreground">Number of Positions:</p>
          <p className="font-medium">{job?.quantity}</p>

          <p className="text-sm text-muted-foreground">Position Level:</p>
          <p className="font-medium">{job?.position_level?.position_name}</p>

          <p className="text-sm text-muted-foreground">Salary Range:</p>
          <p className="font-medium">
            {job?.entry_salary} - {job?.exit_salary}
          </p>

          <p className="text-sm text-muted-foreground">Deadline:</p>
          <p className="font-medium">{formatDate(job?.dead_line)}</p>
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
            <DialogTitle> Basic Information</DialogTitle>
            <DialogDescription>Edit job basic information.</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
            <BasicInfoForm
              jobId={job?.id}
              initialData={job}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BasicDetails;
