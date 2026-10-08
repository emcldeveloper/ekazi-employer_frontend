import { useState } from "react";
import { Loader } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import EmployedForm from "../forms/EmployedForm";

interface EmployCandidateProps {
  applicantId: number;
  jobId: number;
}

const EmployCandidate = ({ applicantId, jobId }: EmployCandidateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Employ Candidate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Move Candidate to Employment</DialogTitle>
          <DialogDescription>
            This candidate will be moved from the offer stage to employment
            stage
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto p-4">
          <EmployedForm
            jobId={jobId}
            selectedApplications={[applicantId]}
            onLoadingChange={setIsSubmitting}
            onSuccess={() => setIsOpen(false)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="employed-form" disabled={isSubmitting}>
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
};

export default EmployCandidate;
