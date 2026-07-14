import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  PencilIcon,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import LanguageForm from "./forms/LanguageForm";
import { useState } from "react";
import type { Job, LanguageRequirement } from "@/@types/job";
import { toast } from "sonner";
import { useDeleteLanguage } from "@/hooks/jobs";

interface LanguageDetailsProps {
  job: Job;
}

const LanguageDetails = ({ job }: LanguageDetailsProps) => {
  const jobId = job?.id;

  const [open, setOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] =
    useState<LanguageRequirement | null>(null);

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
              <LanguageForm jobId={jobId} onSuccess={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Language</TableHead>
            <TableHead>Speak</TableHead>
            <TableHead>Write</TableHead>
            <TableHead>Understand</TableHead>
            <TableHead>Read</TableHead>
            <TableHead>Actions</TableHead>
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
                <TableCell className="flex items-center gap-2">
                  <PencilIcon
                    size={16}
                    onClick={() => setEditingLanguage(item)}
                    className="text-orange-500 cursor-pointer"
                  />

                  <Trash2Icon
                    size={16}
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </TableCell>
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
            <DialogTitle>Edit Education</DialogTitle>
          </DialogHeader>

          <div className="-mx-4 max-h-[70vh] overflow-y-visible px-4">
            {editingLanguage && (
              <LanguageForm
                jobId={jobId}
                language={editingLanguage}
                onSuccess={() => setEditingLanguage(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageDetails;
