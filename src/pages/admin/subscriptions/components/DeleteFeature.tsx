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
import { useDeleteFeature } from "@/hooks/subscription-features";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

interface DeleteFeatureProps {
  id: number;
}

const DeleteFeature = ({ id }: DeleteFeatureProps) => {
  const { mutate: deleteFeature, isPending } = useDeleteFeature();

  const handleDelete = () => {
    deleteFeature(id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Feature deleted successfully");
      },
      onError: (error) => {
        getErrorMessage(error);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={isPending}>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Feature?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this feature.
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

export default DeleteFeature;
