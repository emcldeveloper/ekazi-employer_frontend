import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import ScreeningForm from "./ScreeningForm";
import { useApplicationStages } from "@/hooks/universals";
import type { ApplicationStage } from "@/@types/universals";
import InterviewForm from "./InterviewForm";
import SelectionForm from "./SelectionForm";
import BackgroundCheckForm from "./BackgroundCheckForm";
import OfferForm from "./OfferForm";
import EmployedForm from "./EmployedForm";

interface MoveStageProps {
  jobId: number;
  jobTitle: string;
  jobStage: string;
  selectedApplications: number[];
}

export function MoveStage({
  jobId,
  jobTitle,
  jobStage,
  selectedApplications,
}: MoveStageProps) {
  const [stage, setStage] = useState("");
  const [open, setOpen] = useState(false);

  // stages
  const { data: stages = [] } = useApplicationStages();

  const sortedStages = [...stages].sort((a, b) => a.id - b.id);

  const currentStage = sortedStages.find(
    (s) => s.stage_name.toLowerCase() === jobStage.toLowerCase(),
  );

  const nextStages = currentStage
    ? sortedStages.filter((s) => s.id > currentStage.id)
    : sortedStages;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Move Stage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{jobTitle}</DialogTitle>
          <DialogDescription>
            Move the selected candidate(s) to another stage.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 scrollbar max-h-[60vh] overflow-y-auto px-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Select Stage</FieldLabel>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Stages</SelectLabel>
                    {nextStages.map((item: ApplicationStage) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.stage_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {stage === "3" && (
              <ScreeningForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                setOpen={setOpen}
              />
            )}

            {stage === "4" && (
              <InterviewForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                setOpen={setOpen}
              />
            )}

            {stage === "5" && (
              <SelectionForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                setOpen={setOpen}
              />
            )}

            {stage === "6" && (
              <BackgroundCheckForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                setOpen={setOpen}
              />
            )}

            {stage === "92" && (
              <OfferForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                setOpen={setOpen}
              />
            )}

            {stage === "93" && (
              <EmployedForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                setOpen={setOpen}
              />
            )}
          </FieldGroup>
        </div>
      </DialogContent>
    </Dialog>
  );
}
