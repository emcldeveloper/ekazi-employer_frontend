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
import { useDeleteTask } from "@/hooks/tasks";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

interface DeleteTaskProps {
  taskId: number;
}

const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const { mutate: deleteTask } = useDeleteTask(taskId);

  const handleDelete = () => {
    deleteTask(undefined, {
      onSuccess: (res) => {
        toast.success(res.message || "Task deleted successfully");
      },
      onError: (err) => {
        getErrorMessage(err || "Failed to delete task");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="xs" variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete task?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this task.
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
};

export default DeleteTask;
