import {
  CircleCheckBig,
  CircleXIcon,
  EyeIcon,
  PencilLineIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

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
import BasicInfoForm from "./forms/BasicInfoForm";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import type { Job } from "@/@types/job";

interface BasicDetailsProps {
  job: Job;
}

const BasicDetails = ({ job }: BasicDetailsProps) => {
  const [open, setOpen] = useState(false);

  // job published status, 1 === true or 0 === false
  const publishedStatus = Number(job?.published);

  return (
    <div className="space-y-8">
      <div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold mb-4">{job?.position?.name}</h1>

          <div className="flex items-center gap-4 text-sm">
            <Badge className="bg-orange-100 text-orange-700 p-2">
              <EyeIcon size={16} />
              <p>{job?.statistics?.[0]?.job_views ?? 0} Views</p>
            </Badge>

            <Badge className="bg-blue-100 text-primary">
              <UsersIcon size={16} />
              <p>{job?.total_applicants} Applications</p>
            </Badge>

            {publishedStatus === 1 ? (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                <CircleCheckBig /> Published
              </Badge>
            ) : (
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <CircleXIcon /> Unpublished
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between gap-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-primary p-2 rounded-md">
              <SparklesIcon size={16} />
            </div>

            <h2 className="text-lg font-semibold">Basic Information</h2>
          </div>

          <div className="grid grid-cols-[150px_1fr] gap-y-3">
            <p className="text-sm text-muted-foreground">Job Type:</p>
            <p className="font-medium">{job?.job_type?.name}</p>

            <p className="text-sm text-muted-foreground">Job Category:</p>
            <p className="font-medium">{job?.category?.name}</p>

            <p className="text-sm text-muted-foreground">Job Industry:</p>
            <p className="font-medium">{job?.industry?.name}</p>

            <p className="text-sm text-muted-foreground">
              Number of Positions:
            </p>
            <p className="font-medium">{job?.quantity}</p>

            <p className="text-sm text-muted-foreground">Position Level:</p>
            <p className="font-medium">{job?.position_level?.name}</p>

            <p className="text-sm text-muted-foreground">Salary Range:</p>
            <p className="font-medium">
              {Number(job?.salaries?.[0]?.from_salary?.low).toLocaleString()} -{" "}
              {Number(job?.salaries?.[0]?.to_salary?.low).toLocaleString()}
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
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Update Job</DialogTitle>
              <DialogDescription>Edit job basic information.</DialogDescription>
            </DialogHeader>
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              <BasicInfoForm job={job} onSuccess={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BasicDetails;
