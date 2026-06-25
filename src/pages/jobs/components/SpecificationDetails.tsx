import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BriefcaseBusinessIcon, PencilLineIcon } from "lucide-react";
import { useState } from "react";
import RequirementsForm from "./RequirementsForm";
import { Badge } from "@/components/ui/badge";

interface SpecificationDetailsProps {
  job: any;
}

const SpecificationDetails = ({ job }: SpecificationDetailsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between gap-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <BriefcaseBusinessIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Candidate Specification</h2>
        </div>

        <div className="grid grid-cols-[140px_1fr] gap-y-3">
          <p className="text-sm text-muted-foreground">Experience Years:</p>
          <p className="font-medium">{job?.years_experience || "-"}</p>

          <p className="text-sm text-muted-foreground">Age Group:</p>
          <p className="font-medium">
            {job?.applicant_min_age} - {job?.applicant_max_age}
          </p>

          <p className="text-sm text-muted-foreground">Gender:</p>
          <p className="font-medium">{job?.job_gender?.gender_name}</p>

          <p className="text-sm text-muted-foreground">Culture:</p>
          <div className="font-medium flex gap-1">
            {job?.job_culture?.map((item: any) => (
              <Badge key={item.id}>{item?.culture?.culture_name}</Badge>
            )) || "-"}
          </div>

          <p className="text-sm text-muted-foreground">Personalities:</p>
          <div className="font-medium flex gap-1">
            {job?.job_personality?.map((item: any) => (
              <Badge key={item.id}>{item?.personality?.personality_name}</Badge>
            )) || "-"}
          </div>

          <p className="text-sm text-muted-foreground">Skills:</p>
          <div className="font-medium flex gap-1">
            {job?.job_knowledge?.map((item: any) => (
              <Badge key={item.id}>{item?.knowledge?.knowledge_name}</Badge>
            )) || "-"}
          </div>

          {/* <p className="text-sm text-muted-foreground">Softwares:</p>
          <p className="font-medium">-</p>

          <p className="text-sm text-muted-foreground">Proficiencies:</p>
          <p className="font-medium">-</p>

          <p className="text-sm text-muted-foreground">Tools</p>
          <p className="font-medium">-</p> */}
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
            <DialogTitle>Candidate Specification</DialogTitle>
            <DialogDescription>
              Edit candidate specification information.
            </DialogDescription>
          </DialogHeader>
          <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
            <RequirementsForm job={job} onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SpecificationDetails;
