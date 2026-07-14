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
import RequirementsForm from "./forms/RequirementsForm";
import { Badge } from "@/components/ui/badge";
import type {
  CultureItem,
  Job,
  KnowledgeItem,
  PersonalityItem,
  ProficiencyItem,
  SoftwareItem,
  ToolItem,
} from "@/@types/job";

interface SpecificationDetailsProps {
  job: Job;
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
          <p className="text-sm text-muted-foreground dark:text-white">
            Experience Years:
          </p>
          <p className="font-medium">{job?.years_experience || "-"}</p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Age Group:
          </p>
          <p className="font-medium">
            {job?.applicant_min_age} - {job?.applicant_max_age}
          </p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Gender:
          </p>
          <p className="font-medium">{job?.gender?.name}</p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Culture:
          </p>
          <div className="font-medium flex flex-wrap gap-1">
            {job?.cultures.length > 0
              ? job?.cultures?.map((item: CultureItem) => (
                  <Badge key={item.id}>{item?.culture?.name}</Badge>
                ))
              : "N/A"}
          </div>

          <p className="text-sm text-muted-foreground dark:text-white">
            Personalities:
          </p>
          <div className="font-medium flex flex-wrap gap-1">
            {job?.personalities.length > 0
              ? job?.personalities?.map((item: PersonalityItem) => (
                  <Badge key={item.id}>{item?.personality?.name}</Badge>
                ))
              : "N/A"}
          </div>

          <p className="text-sm text-muted-foreground dark:text-white">
            Skills:
          </p>
          <div className="font-medium flex flex-wrap gap-1">
            {job?.knowledge.length > 0
              ? job?.knowledge?.map((item: KnowledgeItem) => (
                  <Badge key={item.id}>{item?.knowledge?.name}</Badge>
                ))
              : "N/A"}
          </div>

          <p className="text-sm text-muted-foreground dark:text-white">
            Softwares:
          </p>
          <p className="font-medium flex flex-wrap gap-1">
            {job?.softwares.length > 0
              ? job?.softwares?.map((item: SoftwareItem) => (
                  <Badge key={item.id}>{item?.software?.name}</Badge>
                ))
              : "N/A"}
          </p>

          <p className="text-sm text-muted-foreground dark:text-white">
            Proficiencies:
          </p>
          <p className="font-medium flex flex-wrap gap-1">
            {job?.proficiencies.length > 0
              ? job?.proficiencies?.map((item: ProficiencyItem) => (
                  <Badge key={item.id}>{item?.proficiency?.name}</Badge>
                ))
              : "N/A"}
          </p>

          <p className="text-sm text-muted-foreground dark:text-white">Tools</p>
          <p className="font-medium flex flex-wrap gap-1">
            {job?.tools.length > 0
              ? job?.tools?.map((item: ToolItem) => (
                  <Badge key={item.id}>{item?.tool?.name}</Badge>
                ))
              : "N/A"}
          </p>
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
