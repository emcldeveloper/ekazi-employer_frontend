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
  GraduationCapIcon,
  PencilIcon,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import EducationForm from "./forms/EducationForm";
import { useState } from "react";
import type { Education, Job } from "@/@types/job";
import { useDeleteEducation } from "@/hooks/jobs";
import { toast } from "sonner";

interface EducationDetailsProps {
  job: Job;
}

const EducationDetails = ({ job }: EducationDetailsProps) => {
  const jobId = job?.id;

  const [open, setOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );

  // deleting job education
  const { mutate: deleteEducation } = useDeleteEducation();

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
            <GraduationCapIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Job Education</h2>
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
              <DialogTitle>Job Education</DialogTitle>
              <DialogDescription>
                Add job education information.
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-4 max-h-[70vh] overflow-y-visible px-4">
              <EducationForm jobId={jobId} onSuccess={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Education Level</TableHead>
            <TableHead>Programme Name</TableHead>
            <TableHead>Specialized/Major</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {job?.education?.length > 0 ? (
            job?.education.map((item: Education) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.education_level?.name}</TableCell>
                <TableCell>{item?.course?.name}</TableCell>
                <TableCell>{item?.major?.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <PencilIcon
                    size={16}
                    onClick={() => setEditingEducation(item)}
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
                colSpan={4}
                className="text-center py-6 text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* EDIT DIALOG */}
      <Dialog
        open={!!editingEducation}
        onOpenChange={(open) => {
          if (!open) setEditingEducation(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Education</DialogTitle>
          </DialogHeader>

          <div className="-mx-4 max-h-[70vh] overflow-y-visible px-4">
            {editingEducation && (
              <EducationForm
                jobId={jobId}
                education={editingEducation}
                onSuccess={() => setEditingEducation(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationDetails;
