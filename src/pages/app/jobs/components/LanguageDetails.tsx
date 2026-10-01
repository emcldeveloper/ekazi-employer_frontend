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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LanguagesIcon,
  Loader,
  PencilIcon,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import LanguageForm from "../forms/LanguageForm";
import { useState } from "react";
import type { Job, LanguageRequirement } from "@/@types/job";
import { toast } from "sonner";
import { useDeleteLanguage } from "@/hooks/jobs";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { PERMISSIONS } from "@/constants/role-permissions";

interface LanguageDetailsProps {
  job: Job;
}

const LanguageDetails = ({ job }: LanguageDetailsProps) => {
  const jobId = job?.id;

  const [open, setOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] =
    useState<LanguageRequirement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { hasPermission } = useRolePermissions();

  const { mutate: deleteEducation } = useDeleteLanguage();

  const handleDelete = (educationId: number) => {
    const payload = {
      id: educationId,
      job_id: jobId,
    };
    deleteEducation(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Job was deleted succesfully");
      },
      onError: () => {
        toast.error("Failed to delete job education");
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <LanguagesIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Languages</h2>
        </div>

        {hasPermission(PERMISSIONS.EDIT_JOB) && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <PencilLineIcon className="mr-2 size-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Languages</DialogTitle>
                <DialogDescription>
                  Add job languages information.
                </DialogDescription>
              </DialogHeader>

              <div className="-mx-4 max-h-[70vh] overflow-y-visible px-4">
                <LanguageForm
                  jobId={jobId}
                  onSuccess={() => setOpen(false)}
                  onLoadingChange={setIsSubmitting}
                />
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  form="language-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead>Speak</TableHead>
            <TableHead>Write</TableHead>
            <TableHead>Understand</TableHead>
            <TableHead>Read</TableHead>
            {hasPermission(PERMISSIONS.EDIT_JOB) && (
              <TableHead>Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {job?.languages?.length > 0 ? (
            job?.languages.map((item: LanguageRequirement) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.language?.name}</TableCell>
                <TableCell>{item?.speak?.name}</TableCell>
                <TableCell>{item?.write?.name}</TableCell>
                <TableCell>{item?.understand?.name}</TableCell>
                <TableCell>{item?.read?.name}</TableCell>
                {hasPermission(PERMISSIONS.EDIT_JOB) && (
                  <TableCell className="flex items-center gap-2">
                    <PencilIcon
                      size={16}
                      onClick={() => setEditingLanguage(item)}
                      className="text-orange-500 cursor-pointer"
                    />

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant="destructive" size="icon-sm">
                          <Trash2Icon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                          </AlertDialogMedia>
                          <AlertDialogTitle>Delete language?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this language from the
                            job.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel variant="outline">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-6 text-center text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* EDIT DIALOG */}
      <Dialog
        open={!!editingLanguage}
        onOpenChange={(open) => {
          if (!open) setEditingLanguage(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Language</DialogTitle>
            <DialogDescription>Update job language details</DialogDescription>
          </DialogHeader>

          <div className="-mx-4 max-h-[70vh] overflow-y-visible px-4">
            {editingLanguage && (
              <LanguageForm
                jobId={jobId}
                language={editingLanguage}
                onSuccess={() => setEditingLanguage(null)}
                onLoadingChange={setIsSubmitting}
              />
            )}
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="language-form" disabled={isSubmitting}>
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
    </div>
  );
};

export default LanguageDetails;
