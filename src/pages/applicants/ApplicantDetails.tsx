import { CircleQuestionMarkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { formatDate } from "@/utils/helpers";
import type { Application } from "@/@types/applications";
import { toast } from "sonner";
import { useShortlist } from "@/hooks/jobs";
import JobseekerDetails from "../jobseekers/components/JobseekerDetails";
import { getErrorMessage } from "@/utils/axios-helpers";

type ApplicantDetailsProps = {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ApplicantDetails({
  application,
  open,
  onOpenChange,
}: ApplicantDetailsProps) {
  // Data
  const jobId = application?.job_id as number;
  const applicantId = application.applicant_id;
  const applicant = application.applicant;
  const applicationTitle = application?.job?.job_position?.position_name;
  const applicationLetter = application?.letter;
  const applicationStageId = application?.stage?.id;
  const applicationDate = formatDate(application?.updated_at);

  // stages
  const { mutate: shortlistCandidate, isPending: isShortlisting } =
    useShortlist();

  // Handlers
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
          onOpenChange(false);
        },
        onError: (error) => {
          getErrorMessage(error || "Failed to shortlist candidate");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
          <Tabs defaultValue="profile">
            <TabsList variant="line">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="letter">Application Letter</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <JobseekerDetails jobseekerId={applicantId} />
            </TabsContent>
            <TabsContent value="letter">
              <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                <div className="p-6 border border-gray-300 rounded bg-white space-y-4">
                  <div>
                    <p className="font-semibold">
                      {applicant?.first_name} {applicant?.last_name}
                    </p>
                    <p> {applicant?.email}</p>
                    <p>{applicationDate}</p>
                  </div>

                  <p>Dear Mr/Mrs,</p>

                  <h5 className="font-semibold underline">
                    RE: APPLICATION FOR {applicationTitle} POSITION
                  </h5>

                  <div className="whitespace-pre-wrap">{applicationLetter}</div>

                  <p>Sincerely,</p>
                  <p>
                    {applicant?.first_name} {applicant?.last_name}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {applicationStageId === 1 && (
          <DialogFooter>
            <DialogFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={isShortlisting}>
                    {isShortlisting ? "Shortlisting..." : "Shortlist candidate"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
                      <CircleQuestionMarkIcon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                      Shortlist {applicant?.first_name} {applicant?.last_name}?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      This applicant will be notified and moved to the
                      shortlisted candidates list.
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
            </DialogFooter>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
