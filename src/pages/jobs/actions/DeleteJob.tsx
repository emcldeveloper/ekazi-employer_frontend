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
import { useDeleteJob } from "@/hooks/jobs";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DeleteJobProps {
  jobId: number;
}

const DeleteJob = ({ jobId }: DeleteJobProps) => {
  const navigate = useNavigate();

  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob(jobId);

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={isDeleting}
          className="w-full justify-between"
        >
          {isDeleting ? "Deleting ..." : "Delete Job"}
          <Trash2Icon size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDeleteJob}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteJob;
