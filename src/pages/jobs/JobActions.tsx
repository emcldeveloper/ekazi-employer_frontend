import { useNavigate } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleAlert,
  FileStack,
  Plus,
  Trash2,
  UserCheck,
  Users,
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
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useDeleteJob, usePublishJob } from "@/hooks/jobs";
import JobSettings from "./components/actions/JobSettings";

interface JobActionsProps {
  jobId: number;
  isPublished: number;
}

const JobActions = ({ jobId, isPublished }: JobActionsProps) => {
  const navigate = useNavigate();

  const published = isPublished === 1;

  const { mutate: publishJob, isPending: isPublishing } = usePublishJob(jobId);

  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob(jobId);

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

  const handleViewApplications = () => {
    navigate(`/jobs/${jobId}/applications`);
  };

  const handleDeleteJob = () => {
    deleteJob(undefined, {
      onSuccess: (res) => {
        navigate("/jobs");
        toast.success(res?.message || "Job Deleted Succesfully");
      },
      onError: (error) => {
        toast.error("Failed to delete job");
        console.error(error);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {!published && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isPublishing}
                  className="w-full justify-between"
                >
                  {isPublishing ? "Publishing..." : "Publish Job"}
                  <ArrowUpIcon size={16} />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
                    <CircleAlert />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Publish Job?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This job will become visible to candidates and start
                    accepting applications.
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

          {published && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isPublishing}
                  className="w-full justify-between"
                >
                  {isPublishing ? "Unpublishing..." : "Unpublish Job"}
                  <ArrowDownIcon size={16} />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-orange-500/10 text-orange-500 dark:bg-destructive/20 dark:text-orange-500">
                    <CircleAlert />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Unpublish Job?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This job will no longer be visible to candidates and will
                    stop receiving applications.
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
          )}

          <Button
            variant="outline"
            onClick={handleViewApplications}
            className="w-full justify-between"
          >
            View Applications
            <FileStack size={16} />
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Potential Candidates
            <Users size={16} />
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Selected Applicants
            <UserCheck size={16} />
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Add Screener
            <Plus size={16} />
          </Button>

          {/* Job settings  */}
          <JobSettings jobId={jobId} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isDeleting}
                className="w-full justify-between"
              >
                {isDeleting ? "Deleting ..." : "Delete Job"}
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2 />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this job.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDeleteJob}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  );
};

export default JobActions;
