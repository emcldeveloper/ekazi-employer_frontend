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
import BackgroundCheckForm from "../forms/BackgroundCheckForm";

interface BackgroundCheckCandidateProps {
  applicantId: number;
  jobId: number;
}

const BackgroundCheckCandidate = ({
  applicantId,
  jobId,
}: BackgroundCheckCandidateProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Background Check Candidate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Move Candidate to Background Check</DialogTitle>
          <DialogDescription>
            This candidate will be moved from the selection stage to background
            check stage
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto p-4">
          <BackgroundCheckForm
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
          <Button
            type="submit"
            form="background-check-form"
            disabled={isSubmitting}
          >
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

export default BackgroundCheckCandidate;
