import { useState } from "react";
import { Loader, PencilLine } from "lucide-react";

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

import type { QuestionCriteria } from "@/@types/forms";
import QuestionCriteriaForm from "./QuestionCriteriaForm";

interface UpdateQuestionCriteriaProps {
  criteria: QuestionCriteria;
}

const UpdateQuestionCriteria = ({ criteria }: UpdateQuestionCriteriaProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Question Criteria</DialogTitle>
          <DialogDescription>
            Update criteria to evaluate candidates.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto p-4">
          <QuestionCriteriaForm
            questionId={criteria.evaluation_id}
            criteria={criteria}
            onLoadingChange={setIsSubmitting}
            onSuccess={() => setIsOpen(false)}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="question-criteria-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuestionCriteria;
