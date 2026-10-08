import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import ScreeningForm from "../forms/ScreeningForm";
import { useApplicationStages } from "@/hooks/universals";
import type { ApplicationStage } from "@/@types/universals";
import InterviewForm from "../forms/InterviewForm";
import SelectionForm from "../forms/SelectionForm";
import BackgroundCheckForm from "../forms/BackgroundCheckForm";
import OfferForm from "../forms/OfferForm";
import EmployedForm from "../forms/EmployedForm";
import { Loader } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // stages
  const { data: stages = [] } = useApplicationStages();

  const sortedStages = [...stages].sort((a, b) => a.id - b.id);

  const currentStage = sortedStages.find(
    (s) => s.stage_name.toLowerCase() === jobStage.toLowerCase(),
  );

  const nextStages = currentStage
    ? sortedStages.filter((s) => s.id > currentStage.id)
    : sortedStages;

  const formIdByStage: Record<string, string> = {
    "3": "screening-form",
    "4": "interview-form",
    "5": "selection-form",
    "6": "background-check-form",
    "92": "offer-form",
    "93": "employed-form",
  };

  const activeFormId = formIdByStage[stage];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        <div className="-mx-4 scrollbar max-h-[60vh] overflow-y-auto p-4">
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
                onSuccess={() => setIsOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            )}

            {stage === "4" && (
              <InterviewForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                onSuccess={() => setIsOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            )}

            {stage === "5" && (
              <SelectionForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                onSuccess={() => setIsOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            )}

            {stage === "6" && (
              <BackgroundCheckForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                onSuccess={() => setIsOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            )}

            {stage === "92" && (
              <OfferForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                onSuccess={() => setIsOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            )}

            {stage === "93" && (
              <EmployedForm
                jobId={jobId}
                selectedApplications={selectedApplications}
                onSuccess={() => setIsOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            )}
          </FieldGroup>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form={activeFormId} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
