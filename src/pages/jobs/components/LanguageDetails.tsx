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
import { LanguagesIcon, PencilLineIcon } from "lucide-react";
import LanguageForm from "./LanguageForm";
import { useState } from "react";

interface LanguageDetailsProps {
  job: any;
}

const LanguageDetails = ({ job }: LanguageDetailsProps) => {
  const [open, setOpen] = useState(false);

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
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              <LanguageForm job={job} onSuccess={() => setOpen(false)} />
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
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {job?.job_language?.length ? (
            job.job_language.map((item: any) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.language?.language_name}</TableCell>
                <TableCell>{item?.language_speak?.speak_ability}</TableCell>
                <TableCell>{item?.language_write?.write_ability}</TableCell>
                <TableCell>
                  {item?.language_understand?.understand_ability}
                </TableCell>
                <TableCell>{item?.language_read?.read_ability}</TableCell>
                {/* <TableCell className="flex items-center gap-2">
                  <PencilIcon size={16} />
                  <Trash2Icon size={16} />
                </TableCell> */}
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
    </div>
  );
};

export default LanguageDetails;
