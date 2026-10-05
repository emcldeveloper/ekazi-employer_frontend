import type { EvaluationQuestion } from "@/@types/forms";
import { Button } from "@/components/ui/button";
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
import { Loader, PencilLine } from "lucide-react";
import EvaluationQuestionForm from "./EvaluationQuestionForm";
import { useState } from "react";

interface UpdateEvaluationQuestionProps {
  question: EvaluationQuestion;
}

const UpdateEvaluationQuestion = ({
  question,
}: UpdateEvaluationQuestionProps) => {
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
          <DialogTitle>Update Evaluation Question</DialogTitle>
          <DialogDescription>
            Update question to evaluate candidates.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto p-4">
          <EvaluationQuestionForm
            question={question}
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
            form="evaluation-question-form"
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

export default UpdateEvaluationQuestion;
