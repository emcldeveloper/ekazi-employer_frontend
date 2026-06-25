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
import { GraduationCapIcon, PencilLineIcon } from "lucide-react";
import EducationForm from "./EducationForm";
import { useState } from "react";

interface EducationDetailsProps {
  job: any;
}

const EducationDetails = ({ job }: EducationDetailsProps) => {
  const [open, setOpen] = useState(false);

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
                Edit job education information.
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              <EducationForm job={job} onSuccess={() => setOpen(false)} />
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
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {job?.job_education?.length ? (
            job.job_education.map((item: any) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.education_level?.education_level}</TableCell>
                <TableCell>{item?.course?.course_name}</TableCell>
                <TableCell>{item?.major?.name}</TableCell>
                {/* <TableCell className="flex items-center gap-2">
                  <PencilIcon size={16} />
                  <Trash2Icon size={16} />
                </TableCell> */}
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
    </div>
  );
};

export default EducationDetails;
