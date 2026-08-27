import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CircleAlertIcon,
} from "lucide-react";
import { toast } from "sonner";

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

import { usePublishJob } from "@/hooks/jobs";

interface PublishJobProps {
  jobId: number;
  published: boolean;
}

const PublishJob = ({ jobId, published }: PublishJobProps) => {
  const { mutate: publishJob, isPending: isPublishing } = usePublishJob(jobId);
  // Handlers
  const handlePublishJob = () => {
    publishJob(undefined, {
      onSuccess: (res) => {
        toast.success(res?.message || "Job Published Succesfully");
      },
      onError: (error) => {
        toast.error("Failed to publish job");
        console.error(error);
      },
    });
  };

  return (
    <>
      {published ? (
        // Unpublish
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              disabled={isPublishing}
              className="w-full justify-between"
            >
              {isPublishing ? "Unpublishing..." : "Unpublish Job"}
              <ArrowDownLeftIcon size={16} />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
                <CircleAlertIcon />
              </AlertDialogMedia>
              <AlertDialogTitle>Unpublish Job?</AlertDialogTitle>

              <AlertDialogDescription>
                This job will no longer be visible to candidates and will stop
                receiving applications.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                onClick={handlePublishJob}
              >
                Unpublish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        // Publish
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              disabled={isPublishing}
              className="w-full justify-between"
            >
              {isPublishing ? "Publishing..." : "Publish Job"}
              <ArrowUpRightIcon size={16} />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
                <CircleAlertIcon />
              </AlertDialogMedia>
              <AlertDialogTitle>Publish Job?</AlertDialogTitle>

              <AlertDialogDescription>
                This job will become visible to candidates and start accepting
                applications.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={handlePublishJob}>
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default PublishJob;
