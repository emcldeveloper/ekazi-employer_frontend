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
import { useDeleteStaff } from "@/hooks/staff";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

interface DeleteStaffProps {
  staffId: number;
}

const DeleteStaff = ({ staffId }: DeleteStaffProps) => {
  const { mutate: deleteStaff, isPending } = useDeleteStaff();

  const handleDelete = () => {
    deleteStaff(staffId, {
      onSuccess: (res) => {
        toast.success(res?.message || "Staff deleted successfully");
      },
      onError: (error) => {
        getErrorMessage(error);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant="destructive" size="sm">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Staff?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this staff.
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

export default DeleteStaff;
