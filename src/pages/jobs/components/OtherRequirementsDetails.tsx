import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListPlusIcon, PencilLineIcon } from "lucide-react";
import { useState } from "react";
import OtherRequirementsForm from "./OtherRequirementsForm";

interface OtherRequirementsDetailsProps {
  job: any;
}

const OtherRequirementsDetails = ({ job }: OtherRequirementsDetailsProps) => {
  const [open, setOpen] = useState(false);

  const otherRequirement = job?.job_other_requirement?.other_requirement
    ?.replace(/<[^>]*>/g, "")
    .trim();

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <ListPlusIcon size={16} />
          </div>
          <h2 className="text-lg font-semibold">Other Requirements</h2>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <PencilLineIcon className="mr-2 size-4" />
              {otherRequirement ? "Edit" : "Add"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Other Requirements</DialogTitle>
              <DialogDescription>
                {otherRequirement ? "Edit" : "Add"} other requirements
                information.
              </DialogDescription>
            </DialogHeader>
            <div className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
              <OtherRequirementsForm
                job={job}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {otherRequirement ? (
        <div
          className="prose prose-sm max-w-none
               prose-headings:font-semibold
               prose-ul:list-disc
               prose-ul:pl-6"
          dangerouslySetInnerHTML={{
            __html: job?.job_other_requirement?.other_requirement,
          }}
        />
      ) : (
        <div className="py-4 text-center text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
};

export default OtherRequirementsDetails;
