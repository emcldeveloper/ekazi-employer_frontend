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
import { useShortlist } from "@/hooks/jobs";
import { getErrorMessage } from "@/utils/axios-helpers";
import { CircleQuestionMarkIcon } from "lucide-react";
import { toast } from "sonner";

interface ShortlistCandidateProps {
  jobId: number;
  applicantId: number;
}

const ShortlistCandidate = ({
  jobId,
  applicantId,
}: ShortlistCandidateProps) => {
  const { mutate: shortlistCandidate, isPending } = useShortlist();

  const handleShortlist = () => {
    if (applicantId === null) {
      return;
    }

    const payload = {
      stage_id: 2,
      applicant_id: [applicantId],
    };

    shortlistCandidate(
      { jobId, payload },
      {
        onSuccess: () => {
          toast.success("Candidate shortlisted successfully");
        },
        onError: (error) => {
          getErrorMessage(error || "Failed to shortlist candidate");
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending}>
          {isPending ? "Shortlisting..." : "Shortlist candidate"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
            <CircleQuestionMarkIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Shortlist Candidate?</AlertDialogTitle>

          <AlertDialogDescription>
            This applicant will be notified and moved to the shortlisted
            candidates list.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleShortlist}>
            Shortlist
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShortlistCandidate;
