import { Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteEvaluationQuestion } from "@/hooks/forms/useDeleteEvaluationQuestion";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

interface DeleteEvaluationQuestionProps {
  questionId: number;
}

export function DeleteEvaluationQuestion({
  questionId,
}: DeleteEvaluationQuestionProps) {
  const { mutate: deleteQuestion, isPending } = useDeleteEvaluationQuestion();

  const handleDelete = () => {
    deleteQuestion(questionId, {
      onSuccess: (res) => {
        toast.success(res?.message || "Question Deleted");
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon-sm" disabled={isPending}>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Question?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this evaluation question.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
